<#-- @ftlvariable name="" type="com.sinferno.view.DashboardView" -->

<!DOCTYPE html>
<html lang="en">
<head>
${commonHeaders}

    <meta name="description" content="${description}"/>
    <title>${title}</title>

${css}
</head>
<body>
<#include "sections/topbar.ftl" encoding="Shift_JIS">

<div class="container-fluid">
    <div class="row">
        <div class="col-sm-12 main">
            <h1 class="page-header">Dashboard</h1>

            <div class="row">
                <div class="col-md-6">
                    <h2>Recent Events</h2>
                    <table class="table table-striped">
                        <tbody id="eventBody">

                        </tbody>
                    </table>

                </div>
                <div class="col-md-6">
                    <h2>My Teams</h2>
                    <table class="table table-striped">
                        <tbody id="entityBody">
                        </tbody>
                    </table>
                </div>

            </div>
            <div class="row">
                <div class="col-md-6">
                    <h2>Players</h2>
                    <table class="table table-striped">
                        <tbody id="personBody">

                        </tbody>
                    </table>

                </div>
                <div class="col-md-6">
                    <h2>Venues</h2>
                    <table class="table table-striped">
                        <tbody id="venueBody">

                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>
</div>

${js}

</body>
</html>
