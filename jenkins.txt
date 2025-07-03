pipeline {
  agent any

  environment {
    IMAGE_NAME = "test1-playwright"
    CONTAINER_NAME = "playwrights"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build and Run Containers') {
      steps {
        script {
          sh 'docker-compose down --volumes --remove-orphans'
          sh 'docker-compose up -d --build'
        }
      }
    }

    stage('Run Playwright Tests Inside Container') {
      steps {
        script {
          sh "docker exec ${CONTAINER_NAME} npx cucumber-js"
        }
      }
    }

    stage('Archive Cucumber HTML Report') {
      steps {
        archiveArtifacts artifacts: 'report/html/index.html', fingerprint: true
      }
    }

    stage('Publish Cucumber HTML Report') {
      steps {
        publishHTML(target: [
          reportName: 'Cucumber HTML Report',
          reportDir: 'report/html',
          reportFiles: 'index.html',
          keepAll: true,
          alwaysLinkToLastBuild: true,
          allowMissing: false
        ])
      }
    }

    stage('Send Email Notification') {
      steps {
        script {
          emailext(
            subject: 'BDD Test Results',
            body: '✅ Playwright BDD tests completed. View the Cucumber HTML report in Jenkins.',
            to: 'your-team@example.com'
          )
        }
      }
    }

    
  post {
    always {
      echo '🧹 Cleaning up Docker containers and workspace...'
      sh 'docker-compose down --volumes --remove-orphans'
      deleteDir()
    }
  }
}
}