<#-- @ftlvariable name="" type="com.sinferno.view.person.PersonListView" -->

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
            <h1 class="page-header">People</h1>

            <input type="hidden" id="valuesRecordCount" value="0"/>
            <input type="hidden" id="valuesCurrentPage" value="0"/>
            <input type="hidden" id="valuesPageSize" value="0"/>
            <input type="hidden" id="valuesSortColumn" value="key"/>
            <input type="hidden" id="valuesSortOrder" value="asc"/>

            <div class="table-responsive">
                <div class="row">
                    <div class="col-sm-4">
                        &nbsp;
                    </div>
                    <div class="col-sm-4">
                        <button type="button" class="btn btn-default" id="valuesCountDisplay">Displaying x of y</button>
                    </div>
                    <div class="col-sm-4" style="text-align: right;">
                        <div class="btn-group">
                            <button type="button" class="btn btn-default" id="valuesFirstLink">First</button>
                            <button type="button" class="btn btn-default" id="valuesPreviousLink">Previous</button>
                            <button type="button" class="btn btn-default" id="valuesNextLink">Next</button>
                            <button type="button" class="btn btn-default" id="valuesLastLink">Last</button>
                        </div>
                    </div>

                </div>

                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th style="width: 50px;">
                            <a href="/persons/add" class="addRecord"><span class="glyphicon glyphicon-plus"></span></a>
                        </th>
                        <th>Name</th>
                        <th>Gender</th>
                    </tr>
                    </thead>
                    <tbody id="listBody">

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

${js}

</body>
</html>
