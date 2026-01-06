Step-by-step guide from where you are:
Step 1: Check if Nginx is installed
which nginx
If not installed:
sudo apt updatesudo apt install nginx -y
Step 2: Check Nginx status
sudo systemctl status nginx
If it's not running, start it:
sudo systemctl start nginxsudo systemctl enable nginx  # Enable auto-start on boot
Step 3: Create Nginx configuration for your blog
sudo nano /etc/nginx/sites-available/blog
Add this configuration:
server {    listen 4000;    server_name _;  # Accept any domain, or replace with your domain        root /home/mohamaddjamacorporation/corporation/blog/brutalist-blog/_site;    index index.html;        location / {        try_files $uri $uri/ $uri.html =404;    }        location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {        expires 1y;        add_header Cache-Control "public, immutable";    }        error_page 404 /404.html;}
Save: Ctrl + O, then Enter, then Ctrl + X
Step 4: Enable the site
# Create symbolic link to enable the sitesudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/# Remove default site (optional, if you don't need it)sudo rm /etc/nginx/sites-enabled/default
Step 5: Test Nginx configuration
sudo nginx -t
You should see:
nginx: the configuration file /etc/nginx/nginx.conf syntax is oknginx: configuration file /etc/nginx/nginx.conf test is successful
Step 6: Restart Nginx
sudo systemctl restart nginx
Step 7: Check if Nginx is listening on port 4000
sudo netstat -tlnp | grep 4000# orsudo ss -tlnp | grep 4000
You should see Nginx listening on port 4000.
Step 8: Configure Google Cloud firewall
From your local machine (or Google Cloud Console), allow port 4000:
# Get your VM's zone firstgcloud compute instances list# Create firewall rule (replace ZONE with your actual zone)gcloud compute firewall-rules create allow-port-4000 \  --allow tcp:4000 \  --source-ranges 0.0.0.0/0 \  --target-tags http-server
If your VM doesn't have the http-server tag, add it:
gcloud compute instances add-tags blog-server \  --tags http-server \  --zone=YOUR_ZONE
Or create a firewall rule without tags:
gcloud compute firewall-rules create allow-port-4000 \  --allow tcp:4000 \  --source-ranges 0.0.0.0/0
Step 9: Get your VM's external IP
# On your VMcurl ifconfig.me# orhostname -I
Or from your local machine:
gcloud compute instances describe blog-server --zone=YOUR_ZONE --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
Step 10: Test your blog
Open in a browser:
http://YOUR_VM_IP:4000
Or test from the VM:
curl http://localhost:4000
Step 11: (Optional) Update config.yml with your domainIf you have a domain, update the config:
nano _config.yml
Update these lines:
url: "http://yourdomain.com:4000"  # Or https if you set up SSLbaseurl: ""
Then rebuild:
sudo bundle exec jekyll buildsudo systemctl restart nginx
---## Troubleshooting commands:If something doesn't work:
# Check Nginx error logssudo tail -f /var/log/nginx/error.log# Check if port 4000 is in usesudo lsof -i :4000# Check Nginx statussudo systemctl status nginx# Reload Nginx (without dropping connections)sudo nginx -s reload
Start with Step 1 and share any errors you encounter.
