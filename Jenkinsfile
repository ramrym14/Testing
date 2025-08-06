pipeline {
  agent any

  environment {
    CI = 'true'
    IMAGE_NAME = "test1-playwright"
    CONTAINER_NAME = "playwright"
    GIT_REPO = 'git@github.com:ramrym14/Testing.git'
    GIT_BRANCH = 'gh-pages'
    REPORT_DIR = 'report/html'
    CUCUMBER_REPORT_LINK = ''
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          echo "🔨 Building test image…"
          sh "docker build -t ${IMAGE_NAME} ."
        }
      }
    }

    stage('Start Container') {
      steps {
        echo "🚀 Starting fresh container…"
        sh """
          docker rm -f ${CONTAINER_NAME} || true
          docker run -d \\
            --name ${CONTAINER_NAME} \\
            --network app-network \\
            -e CI=true \\
            -p 8000:8000 \\
            --restart unless-stopped \\
            --label container_name=playwright \\
            ${IMAGE_NAME} tail -f /dev/null
        """
      }
    }

    stage('Run Playwright/Cucumber Tests') {
      steps {
        script {
          // Run tests inside container and capture stdout+stderr
          sh """
            docker exec -w /app ${CONTAINER_NAME} bash -lc "npx cucumber-js features/Countries/**/*.feature \\
              --format progress \\
              --publish-all > cucumber_output.txt 2>&1"
          """

          // Copy the captured output from container to Jenkins
          sh "docker cp ${CONTAINER_NAME}:/app/cucumber_output.txt ."

          // Extract the public Cucumber report link
          def link = sh(
            script: "grep -o 'https://reports.cucumber.io/reports/[a-zA-Z0-9-]*' cucumber_output.txt | tail -n 1",
            returnStdout: true
          ).trim()

          env.CUCUMBER_REPORT_LINK = link
          echo "📄 Found Cucumber report link: ${link}"
        }
      }
    }

    stage('Run Visual Tests with Applitools') {
      steps {
        script {
          echo "👁️ Running visual tests with Applitools..."
          echo "🔗 View Applitools Dashboard at: https://eyes.applitools.com"
        }
      }
    }

    stage('Start Metrics Exporter') {
      steps {
        script {
          echo "📊 Starting metrics exporter inside container..."
          sh """
            docker exec -d ${CONTAINER_NAME} bash -c '
              nohup node /app/test_metrics_exporter.js > /app/exporter.log 2>&1 &
            '
          """
        }
      }
    }

    stage('Archive Cucumber HTML Report') {
      steps {
        archiveArtifacts artifacts: 'report/html/index.html', fingerprint: true
      }
    }

    stage('Send Email Notification') {
      steps {
        script {
          emailext(
            subject: 'BDD Test Results',
            body: """
              <p>✅ Playwright BDD tests completed successfully.</p>
              <p><b>View Cucumber Public HTML Report:</b> 
              <a href="${env.CUCUMBER_REPORT_LINK}">${env.CUCUMBER_REPORT_LINK}</a></p>
              <p>Regards,<br>Jenkins</p>
            """,
            mimeType: 'text/html',
            to: 'rymaaissa14@gmail.com',
            from: 'rymaaissa14@gmail.com'
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
