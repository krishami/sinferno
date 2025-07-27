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
            <h2>Register with ${applicationName}</h2>
            <p>&nbsp;</p>
            <form role="form" id="frmRegistration">
                <div class="alert" id="errorsDiv" style="display: none; color:red;"></div>

                <input type="hidden" id="timezone" value=""/>

                <div class="form-group">
                    <label class="control-label" for="fullName">Name</label>
                    <input type="text" class="form-control" id="fullName" placeholder="">
                    <span class="help-block"></span>
                </div>

                <div class="form-group">
                    <label class="control-label" for="email">Email</label>
                    <input type="text" class="form-control" id="email" placeholder="">
                    <span class="help-block"></span>
                </div>

                <div class="form-group">
                    <label class="control-label" for="login">Username</label>
                    <input type="text" class="form-control" id="login" placeholder="">
                    <span class="help-block"></span>
                </div>

                <div class="form-group">
                    <label class="control-label" for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="">
                    <span class="help-block"></span>
                </div>

                <div class="form-group">
                    <label class="control-label" for="rePassword">Re-enter Password</label>
                    <input type="password" class="form-control" id="rePassword" placeholder="">
                    <span class="help-block"></span>
                </div>

                <div class="form-group">
                    <input type="checkbox" id="terms">
                    <label class="control-label" for="terms"> I have read and agree to all the terms andconditions</label>
                    <span class="help-block"></span>
                </div>

                <div class="col-sm-12" style="text-align: right;">
                    <button type="button" class="btn btn-default" id="cancelBtn">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveBtn">Register</button>
                </div>

            </form>

        </div>
        <div class="col-md-3">&nbsp;</div>
    </div>

    <hr/>

    <footer>
        <p>${copyright}</p>
    </footer>
</div> <!-- /container -->

${js}

</body>
</html>
