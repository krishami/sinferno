<#-- @ftlvariable name="" type="com.sinferno.view.sportsEntity.EntityAddView" -->

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
            <h1 class="page-header">Add Sports Entity</h1>
            <p>&nbsp;</p>

            <div class="col-sm-6">
                <form role="form" id="frmEntity">
                    <div class="alert" id="errorsDiv" style="display: none;"></div>
                    <div class="alert alert-success" id="successDiv" role="alert" style="display: none;"></div>


                    <div class="form-group">
                        <label class="control-label" for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="abbreviation">Abbreviation</label>
                        <input type="text" class="form-control" id="abbreviation" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="description">Description</label>
                        <textarea class="form-control" id="description" placeholder=""></textarea>
                        <span class="help-block"></span>
                    </div>

                    <div class="col-sm-12" style="text-align: right;">
                        <button type="button" class="btn btn-default" id="cancelBtn">Cancel</button>
                        <button type="button" class="btn btn-primary" id="saveBtn">Save</button>
                    </div>

                </form>
            </div>

        </div>
    </div>
</div>

${js}

</body>
</html>

