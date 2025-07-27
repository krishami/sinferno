<#-- @ftlvariable name="" type="com.sinferno.view.venue.VenueAddView" -->

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
            <h1 class="page-header">Add Sports Venue</h1>
            <p>&nbsp;</p>

            <div class="col-sm-6">
                <form role="form" id="frmVenue">
                    <div class="alert" id="errorsDiv" style="display: none;"></div>
                    <div class="alert alert-success" id="successDiv" role="alert" style="display: none;"></div>

                    <div class="form-group">
                        <label class="control-label" for="name">Name</label>
                        <input type="text" class="form-control" id="name" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="description">Description</label>
                        <textarea class="form-control" id="description" placeholder=""></textarea>
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="address1">Address 1</label>
                        <input type="text" class="form-control" id="address1" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="address2">Address 2</label>
                        <input type="text" class="form-control" id="address2" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="city">City</label>
                        <input type="text" class="form-control" id="city" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="state">State/Region</label>
                        <input type="text" class="form-control" id="state" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="postalCode">Postal Code</label>
                        <input type="text" class="form-control" id="postalCode" placeholder="">
                        <span class="help-block"></span>
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="country">Country</label>
                        <select class="form-control" id="country">
                            <option></option>
                        </select>

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
