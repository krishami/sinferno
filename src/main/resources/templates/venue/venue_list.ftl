<#-- @ftlvariable name="" type="com.sinferno.view.venue.VenueListView" -->

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
            <h1 class="page-header">Venues</h1>

            <div class="alert" id="errorsDiv" style="display: none;"></div>

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th style="width: 50px;">
                            <a href="/venues/add" class="addRecord"><span class="glyphicon glyphicon-plus"></span></a>
                        </th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody id="venuesListBody">

                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>

${js}

</body>
</html>
