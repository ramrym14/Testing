pipeline {
  agent any

  environment {
    IMAGE_NAME = "test1-playwright"
    CONTAINER_NAME = "playwrights"
    GIT_REPO = 'git@github.com:ramrym14/Testing.git'
    GIT_BRANCH = 'gh-pages'
    REPORT_DIR = 'report/html'
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

    stage('Deploy Report to GitHub Pages') {
      steps {
        sshagent(['github_ssh_key']) {
          script {
            sh '''
              rm -rf gh-pages-tmp
              git clone --branch=${GIT_BRANCH} ${GIT_REPO} gh-pages-tmp
              rm -rf gh-pages-tmp/*
              cp -r ${REPORT_DIR}/* gh-pages-tmp/
              cd gh-pages-tmp
              git config user.name "jenkins"
              git config user.email "jenkins@example.com"
              git add .
              git commit -m "📝 Update test report $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
              git push origin ${GIT_BRANCH}
            '''
          }
        }
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
  }

  post {
    always {
      echo '🧹 Cleaning up Docker containers and workspace...'
      sh 'docker-compose down --volumes --remove-orphans'
      deleteDir()
    }
  }
}
