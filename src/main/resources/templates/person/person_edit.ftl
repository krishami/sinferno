<#-- @ftlvariable name="" type="com.sinferno.view.person.PersonEditView" -->

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
            <h1 class="page-header">Edit Sports Person</h1>
            <p>&nbsp;</p>

            <div class="col-sm-6">
                <form role="form" id="frmEntity">
                    <div class="alert" id="errorsDiv" style="display: none;"></div>
                    <div class="alert alert-success" id="successDiv" role="alert" style="display: none;"></div>


                    <div class="form-group">
                        <label class="control-label" for="fullName">Full Name</label>
                        <input type="text" class="form-control" id="fullName" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="gender">Gender</label>
                        <select class="form-control" id="gender">
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

<input type="hidden" id="personId" value="${personId}"/>

</body>
</html>
