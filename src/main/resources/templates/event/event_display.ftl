<#-- @ftlvariable name="" type="com.sinferno.view.sportsEvent.EventDisplayView" -->

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
            <div class="table-responsive">
                <div class="alert" id="errorsDiv" style="display: none; color:red;"></div>

                <div id="tournament"></div>

            </div>
        </div>
    </div>
</div>

${js}

<input type="hidden" id="eventId" value="${eventId}"/>

</body>
</html>
