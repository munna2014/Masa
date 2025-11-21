# StaffFlow - Deployment Guide

## 📦 Production Build

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Build Output
- Minified JavaScript
- Optimized CSS
- Compressed images
- Source maps (optional)

---

## 🌐 Deployment Options

## Option 1: Netlify (Recommended)

### Prerequisites
- Netlify account (free at netlify.com)
- Git repository (GitHub, GitLab, or Bitbucket)

### Method A: Git-based Deployment

1. **Push to Git**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Netlify**
   - Go to netlify.com
   - Click "New site from Git"
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`

3. **Deploy**
   - Netlify automatically deploys on push
   - Your site is live!

### Method B: CLI Deployment

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Deploy**
```bash
netlify deploy --prod --dir=build
```

### Environment Variables
Create `.env` file:
```
REACT_APP_API_URL=https://your-api.com
REACT_APP_NOTIFICATION_KEY=your_key
```

---

## Option 2: Vercel

### Prerequisites
- Vercel account (free at vercel.com)
- Git repository

### Deployment Steps

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

### Configuration
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "env": {
    "REACT_APP_API_URL": "@api_url"
  }
}
```

---

## Option 3: GitHub Pages

### Prerequisites
- GitHub account
- Repository on GitHub

### Setup

1. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/staffing-platform",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

2. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

3. **Deploy**
```bash
npm run deploy
```

---

## Option 4: AWS S3 + CloudFront

### Prerequisites
- AWS account
- AWS CLI installed

### Steps

1. **Build**
```bash
npm run build
```

2. **Create S3 bucket**
```bash
aws s3 mb s3://staffing-platform-prod
```

3. **Upload files**
```bash
aws s3 sync build/ s3://staffing-platform-prod --delete
```

4. **Create CloudFront distribution**
   - Use S3 bucket as origin
   - Set default root object to `index.html`
   - Configure error handling

5. **Update DNS**
   - Point domain to CloudFront distribution

---

## Option 5: Docker

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

### Build and Run
```bash
docker build -t staffing-platform .
docker run -p 3000:3000 staffing-platform
```

### Push to Docker Hub
```bash
docker tag staffing-platform yourusername/staffing-platform
docker push yourusername/staffing-platform
```

---

## Option 6: Traditional Server (Node.js)

### Prerequisites
- Node.js installed on server
- PM2 or similar process manager

### Setup

1. **Build**
```bash
npm run build
```

2. **Install serve**
```bash
npm install -g serve
```

3. **Start server**
```bash
serve -s build -l 3000
```

4. **Use PM2 for persistence**
```bash
npm install -g pm2
pm2 start "serve -s build -l 3000" --name staffing-platform
pm2 startup
pm2 save
```

---

## 🔒 Security Checklist

### Before Deployment
- [ ] Remove console.log statements
- [ ] Set environment variables
- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Add authentication
- [ ] Validate all inputs
- [ ] Use secure headers
- [ ] Enable rate limiting

### Environment Variables
```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_NOTIFICATION_API=https://notify.yourdomain.com
REACT_APP_ENVIRONMENT=production
```

### Security Headers
Add to server configuration:
```
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

---

## 📊 Performance Optimization

### Code Splitting
Already configured in Create React App. Routes are automatically split.

### Image Optimization
```bash
npm install -D imagemin imagemin-cli
```

### Bundle Analysis
```bash
npm install -D source-map-explorer
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

### Lazy Loading
Already implemented in components using React.lazy()

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=build
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 📈 Monitoring & Analytics

### Add Google Analytics
```bash
npm install react-ga4
```

In `App.jsx`:
```javascript
import ReactGA from "react-ga4";

ReactGA.initialize("GA_MEASUREMENT_ID");
ReactGA.send("pageview");
```

### Error Tracking
```bash
npm install @sentry/react
```

---

## 🚀 Post-Deployment

### Verify Deployment
1. Check site loads correctly
2. Test all features
3. Verify responsive design
4. Check console for errors
5. Test on different browsers

### Monitor Performance
- Use Lighthouse
- Check Core Web Vitals
- Monitor error rates
- Track user analytics

### Maintenance
- Keep dependencies updated
- Monitor security vulnerabilities
- Regular backups
- Update content regularly

---

## 🔧 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Fails
- Check build logs
- Verify environment variables
- Check disk space
- Verify Node version

### Site Not Loading
- Check DNS settings
- Verify SSL certificate
- Check server logs
- Test locally first

### Slow Performance
- Analyze bundle size
- Enable compression
- Use CDN
- Optimize images
- Enable caching

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Environment variables set
- [ ] Build successful locally
- [ ] Security audit passed
- [ ] Performance optimized

### Deployment
- [ ] Database migrations run
- [ ] Environment variables configured
- [ ] SSL certificate valid
- [ ] Backup created
- [ ] Monitoring enabled

### Post-Deployment
- [ ] Site loads correctly
- [ ] All features working
- [ ] Analytics tracking
- [ ] Error monitoring active
- [ ] Performance acceptable
- [ ] Team notified

---

## 📞 Support

### Common Issues

**Build fails with "out of memory"**
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

**Port already in use**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9
```

**CORS errors**
- Configure backend CORS headers
- Update API URL in environment variables

---

## 🎯 Recommended Setup

### For Small Teams
- **Hosting**: Netlify
- **Database**: Firebase
- **Analytics**: Google Analytics
- **Monitoring**: Sentry

### For Enterprise
- **Hosting**: AWS/Azure
- **Database**: PostgreSQL
- **Analytics**: Custom solution
- **Monitoring**: DataDog/New Relic

---

## 📚 Resources

- [Netlify Deployment](https://docs.netlify.com)
- [Vercel Deployment](https://vercel.com/docs)
- [AWS Deployment](https://aws.amazon.com/getting-started)
- [Docker Documentation](https://docs.docker.com)
- [GitHub Actions](https://github.com/features/actions)

---

**Last Updated**: November 2024
**Version**: 1.0.0
