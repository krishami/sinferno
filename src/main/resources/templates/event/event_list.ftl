<#-- @ftlvariable name="" type="com.sinferno.view.sportsEvent.EventListView" -->

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
            <h1 class="page-header">Events</h1>

            <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    Create <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="/sportsEvents/add?eventType=ROUND">Tournament</a></li>
                    <li><a href="/sportsEvents/add?eventType=MATCH">Match</a></li>
                </ul>
            </div>

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th style="width: 75px;">
                            &nbsp;
                        </th>
                        <th>Event</th>
                        <th>Type</th>
                        <th>Sport</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                    </thead>
                    <tbody id="eventBody">

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

${js}

</body>
</html>
