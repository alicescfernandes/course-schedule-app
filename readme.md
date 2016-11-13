<p>Hi there. The code in this repo is about a schedule app that i did, to chech the schedule to my course. I will explain in this readme all you need to know, but first things first: This code was edited to be pushed to Github. I replaced some things, like urls and other sensitive data, just for privacy and security reasons.</p>

<h3>What's stripped?</h3>
<p>Some things were changed before i pushed to git. Like:</p>
<ul>
<li>URLs: The urls that were used to the actual app are diferent than the ones this code uses. I truly advise you to go through the code, you will notice some dumb names. Just replace them with your urls, but don't change the name of the PHP files. Remember That!</li>
<li>Sample Data: All the data was replaced with sample data, for you to conduct your own unit tests. Again, you will notice some weird names and again just make sure to read all the code, try do decode what i've done.</li>
</ul>

<p>Although is sample data, is still works like the actual app, just make sure you got the urls right, and you <b>must set a localStorage key, so open up your devTools and go to the cookies/localStorage/sessionStorage menu and set <em>token</em> to <em>088038</em>, like <code>token : 088038</code></b>. Otherwise it won't work.
This token is a pre-default one, it is already validated and ready to use. You can check for tokens in the <code>secrets.xml</code> file, <b>don't get confused, it is the <code>secrets.xml</code> file</b>.
</p>

<h3>Background introduction</h3>

<p>So, i am currently attending a course, and instituition where i attend as a poor website, it's is a messy, ugly and unpratical website, and lacks responsive design as is not adaptable to mobile devices. So, i tought to myself <em>There's gotta be a way to get data out of this website</em> and it was. After a few minutes, i was able to find a data entry point, a small detail that was left unprotected on the website, a sort of REST API with data about the scheduling of the course. With that REST API, i was able to see the schedule for all courses undergoing, and get the full schedule of all courses <em>Like everything, every single class that was schedule on that course</em>. I was also able to see the classrooms, the hours of the classes, and the amount of classes that we would have for each discipline.</p>

<p>So, i took that exploit and built an app out of it, that is more usefull than the official app of the instituition, and of course, more pretier!</p>

<p><b>I'm not going to put any linking to the exploit, as i wan't it to leave it "untouchable". Just for privacy reasons.</b></p>


<h3>Server-side action</h3>
<p>After i was able to deal with all the data, i wans't going to link the app directly to the exploit. So, i've built also some server (you can think as proxy server) that makes the brigde between the app and the exploit. Also, i've protected the app from being distributed outside my classmates by making authorization codes that only me can give. With thos codes, i'm able to control the app usage, because every code has acess permitions, i can revoke those permitions, making the app completly unusable (i will talk about this permission system later).<br>
Because the lack of a good database server, i did all of the server-side code with XML, reading and editing XML files with PHP.</p>


<h4>Permission System</h4>
<p>Like i mention before, this app requests data to what i call a server-proxy, it doens't request data directly to the exploit, but to a server that processes data provided by the app, and makes the request for data to the exploit. This alwoed me to code a permission system, where i can control app permition to acess data. This system runs on XML files, because the server where i have this running performs bad with databases.</p>

<p>The secret code is the only way to validate an acess to the app. It is generated randomly, from a token that is given by me. The code is a combination of 8 digits randomly picked. You can't just put any secret code you like, because the secret code has to be registred in the <code>secrets.xml</code> file, and that's what the token is for. The token gives you permition to you to generate your own secret code, and after you get the code, you use it on your app to get acess. The reason why i did it this way is because i don't know who the secret code belongs to, because i just don't care about that, and because it keeps some privacy to my app users.</p>

<p>So, in the <code>secrets.xml</code> file you can that i have a attribute called <em>acess-control</em>. This attribute only takes two difrent values: <em>revoke</em> and <em>allow</em>. All of the secret codes have by default have <em>allow</em> in the  <em>acess-control</em> attribute. If by any change the attribute value is <em>revoke</em>, this value will be transmited to the app on the next request for data, and when the app request for permissions returns <em>revoke</em>, the app automatically deletes all the cached data, including the local secret codes, and reloads, asking for a code again. This makes the app unsusefull, because in order to use the app,you need a valid secret code.</p>

<p>Every code can only be used once, and that what the <em>validation</em> attribute is for. Simple logic: if <em>validation</em> value is true, then the code was already used to validate somebody's app. If is false, then the code can be used to validate your acess for the app.</p>

<p>The last attribute that i want to mention is the <em>expiry</em>. This attribute was to define the lifecycle of the app, making it unusable after the date as expired. It's one of the many things i didn't implemented, because i actually didn't need that yet.</p>


<h3> Client-side App action</h3>
<p>The app is built with Apache Cordova, on android-23(Android 6.0). Is just a packed version of HTML5, CSS and alot of javascript. I did found some issues while coding the design of the app, because of the browser where the app was packed in. In summary, Apache Cordova packs the app in a Webkit Webview, but the webviews version vary on each operative system version. Some of the phones where i tested were able to render CSS3 properties like viewport measures, animations and woff webfonts, and some of the phones where i tested didn't recognize viewport measures, woff webfonts and animations. Specifically for older browsers, i had to make fallback options, like using percentage meauseres, and removing animations, while keeping the design seamless for older and new browsers. This proven to be a challenging thing to do,has i had no ideia that this would happen, and attracted my attention to cross-browser compatibility, and why i should worry about making my website or app acessible to difrent browsers in difrent platforms.</p>

<p>The app runs on javascript to make requests to the proxy-server, and the proxy-server returns JSON data. The returned JSON data is then placed and formatted into the UI, like i did designed beforehand. This formatting included alot of chopping and splitting values (i problably could done all of this with a RegExp, but i just found more easier using array and string methods.</p>
