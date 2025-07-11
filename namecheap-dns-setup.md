# Namecheap DNS Configuration for GitHub Pages

## Steps to Configure stellarthrone.games on Namecheap:

1. **Log in to Namecheap** and go to your Domain List

2. **Click "Manage"** next to stellarthrone.games

3. **Go to "Advanced DNS"** tab

4. **Remove any existing records** for @ and www (if any)

5. **Add these DNS records:**

### For apex domain (stellarthrone.games):
- **Type:** A Record
- **Host:** @
- **Value:** 185.199.108.153
- **TTL:** Automatic

- **Type:** A Record
- **Host:** @
- **Value:** 185.199.109.153
- **TTL:** Automatic

- **Type:** A Record
- **Host:** @
- **Value:** 185.199.110.153
- **TTL:** Automatic

- **Type:** A Record
- **Host:** @
- **Value:** 185.199.111.153
- **TTL:** Automatic

### For www subdomain (www.stellarthrone.games):
- **Type:** CNAME Record
- **Host:** www
- **Value:** philipludington.github.io
- **TTL:** Automatic

## Verification Steps:

1. **In GitHub:** 
   - Go to Settings > Pages in your repository
   - You should see "Your site is published at https://stellarthrone.games"
   - If you see a DNS check warning, wait 10-30 minutes for DNS propagation

2. **Test DNS propagation:**
   ```bash
   dig stellarthrone.games
   dig www.stellarthrone.games
   ```

3. **Enable HTTPS in GitHub Pages:**
   - Once DNS is verified, check "Enforce HTTPS" in GitHub Pages settings

## Important Notes:
- DNS changes can take up to 24-48 hours to propagate globally
- GitHub will automatically provision an SSL certificate once DNS is verified
- The site may show a certificate warning initially - this is normal and will resolve once GitHub provisions the certificate

## Troubleshooting:
- If the domain doesn't work after 24 hours, verify all 4 A records are correct
- Make sure there are no conflicting AAAA (IPv6) records
- Ensure the CNAME file in your repo contains exactly: stellarthrone.games