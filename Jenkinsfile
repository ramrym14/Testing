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

 stage('Check Docker and Docker Compose') {
      steps {
        script {
          sh 'docker --version'
          sh """
            if [ "\$(docker ps -q -f name=${CONTAINER_NAME})" ]; then
              echo "✅ Container '${CONTAINER_NAME}' is already running. Nothing to do."
            elif [ "\$(docker ps -aq -f name=${CONTAINER_NAME})" ]; then
              echo "♻️ Container '${CONTAINER_NAME}' exists but stopped. Starting it..."
              docker start ${CONTAINER_NAME}
            else
              echo "🚀 Container '${CONTAINER_NAME}' does not exist. Creating and starting it..."
              docker-compose up -d playwright
            fi
          """
          echo "🛠️ Docker and Docker Compose OK"
        }
      }
    }

stage('Check Host Memory Before Tests') {
  steps {
    sh 'free -h || vmstat || top -b -n1 | head -20'
  }
}

stage('Run Playwright Tests Inside Container') {
  steps {
    script {
      echo "📈 Current Docker container stats before running tests:"
      sh "docker stats --no-stream ${CONTAINER_NAME}"

      sh "docker exec ${CONTAINER_NAME} free -h" // inside container

      sh "docker exec ${CONTAINER_NAME} xvfb-run npx cucumber-js 'features/Countries/**/*.feature' || true"

      echo "📈 Docker container stats after running tests:"
      sh "docker stats --no-stream ${CONTAINER_NAME}"
    }
  }
}

stage('Check Host Memory After Tests') {
  steps {
    sh 'free -h || vmstat || top -b -n1 | head -20'
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
        sshagent(['ssh-key-for-github']) {
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
            to: 'rymaaissa14@gmail.com'
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
