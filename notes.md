## GITHUB
I learned that visual code works very well with Github in order to `git pull`, `git push`, and `git commit` changes. ***It's essential to only make changes on one environment in order to avoid merges conflits***
The use of git bash is also very useful for **cloning** repositories, but make sure you are in the *correct directory*
See [README](README.md)
## AWS EC2
- My IP Address is http://52.6.5.201/
- In order to ssh into my portal I need to remember this command
➜  ssh -i [key pair file] ubuntu@[ip address] in which my key pair is stored in my CS 260 folder
## Caddy
Caddy handles all of the creation and rotation of web certificates so that we can easily support HTTPS
- Configuration file : ~/Caddyfile
    - This contatins the definitions for routing HTTP requests. to determine the location where static HTML files are loaded from and proxy requests. You shouldn't have to modify it
- HTML files ~/pulblic_html
    - This is the directory of files that Caddy serves up when reuqests are made to the root or your web server. It will look for the file in your directory.
## HTTPS and TLS
HTTPS stands for Secure Hypertext TRansport Protocol. TLS is sometimes called SSL.
- the -v parameter shows the verbose output of the HTTPS exchange. The > /dev/null redirection throws away the actual HTTP response, since we only care about the negotiation, by redirecting the output to the null device.
- HTTPS normally runs on 433 while HTTP is one 80. TCP does flow control and makes the connection reliable
