# GitHub Actions Workflows

## Build Android APK

This workflow automatically builds an Android APK when code is pushed to the `main` branch.

### Setup Instructions

1. **Create an Expo Access Token:**
   - Go to https://expo.dev/accounts/[your-account]/settings/access-tokens
   - Click "Create Token"
   - Give it a name like "GitHub Actions"
   - Copy the token (you won't see it again!)

2. **Add the token to GitHub Secrets:**
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `EXPO_TOKEN`
   - Value: Paste the token you copied
   - Click "Add secret"

3. **Configure EAS Build Profile:**

   Make sure your `eas.json` has a `production-apk` profile configured. Example:

   ```json
   {
     "build": {
       "production-apk": {
         "android": {
           "buildType": "apk",
           "gradleCommand": ":app:assembleRelease"
         }
       }
     }
   }
   ```

### How It Works

- **Automatic Trigger:** Builds run automatically when you push to `main`
- **Manual Trigger:** You can also trigger builds manually from the Actions tab
- **Build Location:** The APK is built on EAS Build servers (cloud build)
- **Accessing Builds:** Check your builds at https://expo.dev/accounts/[your-account]/projects/vom-app/builds

### Alternative: Local Builds in CI

If you prefer to build locally in GitHub Actions (without using EAS Build servers), you would need to:

1. Use `eas build --local`
2. Set up Android SDK and build tools in the runner
3. Configure credentials properly
4. Upload the APK as an artifact

The current setup uses EAS cloud builds which is simpler and more reliable.

### Troubleshooting

- **Build fails with "Unauthorized":** Check that your `EXPO_TOKEN` secret is set correctly
- **Build fails with profile error:** Make sure `production-apk` profile exists in `eas.json`
- **Want to download APK in workflow:** Remove `--no-wait` and add steps to download the build artifact

### Cost Considerations

- EAS Build has a free tier with limited build minutes
- For unlimited builds, consider an EAS subscription
- Alternatively, configure local builds (more complex setup)
