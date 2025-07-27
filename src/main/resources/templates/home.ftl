<#-- @ftlvariable name="" type="com.sinferno.view.HomeView" -->

<!DOCTYPE html>
<html lang="en">

<head>
${commonHeaders}

    <meta name="description" content="${description}"/>
    <title>${title}</title>

${css}
</head>

<body>

<nav class="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="/">${applicationName}</a>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">

        <form class="form-inline my-2 my-lg-0  navbar-right" role="form">
            <div class="form-group">
                <input type="text" placeholder="Login" class="form-control" id="login">
            </div>
            <div class="form-group">
                <input type="password" placeholder="Password" class="form-control" id="password">
            </div>
            <button type="button" class="btn btn-primary" id="loginBtn">Sign In</button>

        </form>
    </div>
</nav>

<div class="jumbotron">
    <div class="container">
        <h1>Hello There!</h1>
        <p>${applicationName} manages your sports sportsEvents, teams, and players.</p>
        <p><a class="btn btn-primary btn-lg" role="button" href="/register">Sign Up Today &raquo;</a></p>
    </div>
</div>

<div class="container">
    <!-- Example row of columns -->
    <div class="row">
        <div class="col-md-4">
            <h2>Manage Sports Events</h2>
            <ul>
                <li>Conduct tournaments or one-off matches.</li>
                <li>Create rosters and record score sheets.</li>
                <li>Generate detailed statistics.</li>
            </ul>

        </div>
        <div class="col-md-4">
            <h2>Invite Your Friends</h2>
            <ul>
                <li>Bring over your sports mates.</li>
                <li>Compare performance and records.</li>
                <li>Arrange social or formal matches.</li>
            </ul>
        </div>
        <div class="col-md-4">
            <h2>Let the World Know!</h2>
            <ul>
                <li>Have your own sports profile page.</li>
                <li>Invite people to your tournaments.</li>
                <li>Publish statistics and news.</li>
            </ul>
        </div>
    </div>

    <hr>

    <footer>
        <p>${copyright}</p>
    </footer>
</div> <!-- /container -->

${js}

</body>
</html>





