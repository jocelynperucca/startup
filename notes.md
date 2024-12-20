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
## HTML
- You always want to call your top level **"index.html"**.
- There are 3 levels, Header, Body/Content, and Footer. **Make sure to include in your FOOTER a link to your github repository.**
- Use the deployment script after you've done al you want with your key, server, and name of files in order to get it to your actual server you made. It will be different for each technology.
- ./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon
## CSS
Cascading Style Sheets change sections of HTML for stylistic measures. It defines rules for certain selectors. </br>
![CSS](/cssDefinitions.jpg) </br>
You can do css for sections like:
- p
- header
- li
- h2
- td
- classes like
    - #table (whatever class you assign it.)
    - section class="fly-in"

Some things you might change are:
- background-color
- width or height
- list-style
- color (can be used with keywords, or RGB hex/function, or hsl if you're wanting crazy hue saturation and light)
- text-align
- border
- padding (usually followed by **1em**)
- font-size (many different units of measurement for that) You can also import fonts from other websites.
- and many others

You can also do Animations! Depends on the animation name but you would do somethiong like: <animation-name: demo;animation-duration: 3s;>
- @Keyframes are for key points and then CSS will do smooth transitions. For example: </br>

You can also include bootstrap by just including: < link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" >

- It is used in HTML but is a style sheet that you can use any class found in BootStrap to make it look uniform and better without so much CSS code.

< @keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
} >
## SIMON CSS
I cloned the Simon-CSS to my repository using my pem key. I learned that with simple css changes such as to the header and footer to make the design of a webpage look put together. Padding commands are also important.
- Flex features are important for  when the size changes. I need to make sure to add those to ensureit stays in form when moved around.
## JAVASCRIPT
- Async and Await:
  - setTimeout allows a function to be called, grab the info, but return the result after a specified amount of time.
  promise are only good for one go.
  - `return new Promise((resolve, reject) => {`
  - The `async` keyword declares that a function returns a promise. The `await` keyword wraps a call to the async function, blocks execution until the promise has resolved, and then returns the result of the promise.
    - `console.log(await cow()); // OUTPUT: moo`
  By combining async, to define functions that return promises, with await, to wait on the promise, you can create code that is asynchronous, but still maintains the flow of the code without explicitly using callbacks.
  `const httpResponse = await fetch('https://simon.cs260.click/api/user/me');`
- Promises
  - There are 3 possible states:
    - pending - Currently running asynchronously
    - fulfilled - Completed successfully  
    - rejected - Failed to complete   