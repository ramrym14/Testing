pipeline {
  agent any

  environment {
    CI             = 'true'   
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

          # run container from the image (no workspace bind-mount)
          docker run -d --name ${CONTAINER_NAME} \\
            -e CI=true \\
            ${IMAGE_NAME} \\
            tail -f /dev/null
        """
      }
    }

stage('Run Playwright/Cucumber Tests') {
  steps {
    script {
      // Clean up any old report
      sh """
        docker exec ${CONTAINER_NAME} rm -f /app/report/cucumber-report.json || true
      """

      // Run cucumber-js under bash -lc so it picks up the shebang & PATH correctly
      sh """
        docker exec \
          -w /app \
          ${CONTAINER_NAME} \
          bash -lc "npx cucumber-js features/Countries/**/*.feature \
            --format progress \
            --format json:/app/report/cucumber-report.json"
      """
    }
  }
}


stage('Start Metrics Exporter') {
  steps {
    script {
      echo "📊 Starting Node.js metrics exporter…"
      sh '''
        cd $WORKSPACE
        if [ ! -d node_modules ]; then
          npm install express prom-client
        fi
        # Run exporter and tee output to a log file
        nohup node test_metrics_exporter.js > exporter.log 2>&1 &
        sleep 3
        echo "✅ Exporter started on http://localhost:8000/metrics"
        echo "📄 Tailing metrics exporter logs..."
        tail -n 20 -f exporter.log &
      '''
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
          mkdir -p ~/.ssh
          ssh-keyscan github.com >> ~/.ssh/known_hosts

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



 // 🚀 New stages
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
