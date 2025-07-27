<!DOCTYPE html>
<html lang="en">
<head>
${commonHeaders}

    <meta name="description" content="${description}"/>
    <title>${title}</title>

${css}
</head>

<body>

<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">${applicationName}</a>
        </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="col-md-3">&nbsp;</div>
        <div class="col-md-6">
            <h2>Page Not Found</h2>
            <p>&nbsp;</p>
            <p>
                Sorry! We could not locate the page you were looking for. <br/>
                Please return to the <a href="/">home page</a>.
            </p>
        </div>
        <div class="col-md-3">&nbsp;</div>
    </div>

    <hr/>

    <footer>
        <p>${copyright}</p>
    </footer>
</div>

${js}

</body>
</html>

