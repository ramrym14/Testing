pipeline {
  agent any

  environment {
    CI = 'true'
    IMAGE_NAME = "test1-playwright"
    CONTAINER_NAME = "playwright"
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
            ${IMAGE_NAME}
        """
      }
    }

    stage('Run Playwright/Cucumber Tests') {
      steps {
        script {
          sh """
            docker exec ${CONTAINER_NAME} rm -f /app/report/cucumber-report.json || true
          """
          sh """
            docker exec \\
              -w /app \\
              ${CONTAINER_NAME} \\
              bash -lc "npx cucumber-js features/Countries/**/*.feature \\
                --format progress \\
                --format json:/app/report/cucumber-report.json"
          """
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

          def success = false
          for (int i = 0; i < 10; i++) {
            def result = sh(
              script: "docker exec ${CONTAINER_NAME} curl -sf http://localhost:8000/metrics || true",
              returnStdout: true
            ).trim()

            if (result.contains("tests_passed") || result.contains("tests_failed")) {
              echo "✅ Exporter is up and responding."
              success = true
              break
            }

            echo "⏳ Waiting for exporter... (${i + 1}/10)"
            sleep 2
          }

          if (!success) {
            error("❌ Exporter failed to start or did not respond with metrics.")
          }
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

    stage('Check Prometheus') {
      steps {
        script {
          echo "🔎 Checking Prometheus..."
          sh "curl -s http://prometheus:9090/-/ready || echo '⚠️ Prometheus not reachable'"
        }
      }
    }

    stage('Show Grafana URL') {
      steps {
        script {
          echo "🎨 Grafana is available at: http://localhost:3000"
          echo "🔗 You can open it in your browser to explore dashboards."
        }
      }
    }

    stage('Check cAdvisor') {
      steps {
        script {
          echo "🔎 Checking cAdvisor..."
          sh "curl -s http://cadvisor:8080/ || echo '⚠️ cAdvisor not reachable'"
        }
      }
    }

    stage('Send Email Notification') {
      steps {
        script {
          emailext(
            subject: 'BDD Test Results',
            body: '✅ Playwright BDD tests completed. View the Cucumber HTML report in Jenkins.',
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
