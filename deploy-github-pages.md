# Deploy to GitHub Pages

1. Create a new GitHub repository named `stellarthrone.games`

2. Initialize git and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stellarthrone.games.git
git push -u origin main
```

3. Go to repository Settings > Pages
4. Set Source to "Deploy from a branch"
5. Select "main" branch and "/ (root)" folder
6. Save

Your site will be available at:
`https://YOUR_USERNAME.github.io/stellarthrone.games/`

## Custom Domain (optional)
1. Add a CNAME file with your domain:
```bash
echo "stellarthrone.games" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

2. In your domain registrar, add:
   - A record: 185.199.108.153
   - A record: 185.199.109.153
   - A record: 185.199.110.153
   - A record: 185.199.111.153
   - CNAME record: www -> YOUR_USERNAME.github.io