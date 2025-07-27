<#-- @ftlvariable name="" type="com.sinferno.view.user.UserEditView" -->

<!DOCTYPE html>
<html lang="en">
<head>
${commonHeaders}

    <meta name="description" content="${description}"/>
    <title>${title}</title>

${css}
</head>
<body>
<#include "../sections/topbar.ftl" encoding="Shift_JIS">

<div class="container-fluid">
    <div class="row">
        <div class="col-sm-12 main">
            <h1 class="page-header">My Account</h1>
            <p>&nbsp;</p>

            <div class="col-sm-6">
                <form role="form" id="frmRegistration">
                    <div class="alert" id="errorsDiv" style="display: none;"></div>
                    <div class="alert alert-success" id="successDiv" role="alert" style="display: none;"></div>

                    <div class="form-group">
                        <label class="control-label" for="login">Username</label>
                        <input type="text" class="form-control" id="login" disabled="disabled" placeholder="">
                    </div>

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
                        <label class="control-label" for="oldPassword">Old Password</label>
                        <input type="password" class="form-control" id="oldPassword" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="password">New Password</label>
                        <input type="password" class="form-control" id="password" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="rePassword">Re-enter Password</label>
                        <input type="password" class="form-control" id="rePassword" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="timezone">Timezone</label>
                        <select class="form-control" id="timezone">
                            <option></option>
                        </select>

                        <span class="help-block"></span>
                    </div>

                    <div class="col-sm-12" style="text-align: right;">
                        <button type="button" class="btn btn-default" id="cancelBtn">Cancel</button>
                        <button type="button" class="btn btn-primary" id="saveBtn">Update</button>
                    </div>

                </form>
            </div>

        </div>

    </div>
</div>

${js}

<input type="hidden" id="userId" value="${userId}"/>

</body>
</html>

