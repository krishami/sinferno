<#-- @ftlvariable name="" type="com.sinferno.view.venue.VenueDisplayView" -->

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
            <h1 class="page-header">
                <span id="venueName"></span>
            </h1>

            <div class="table-responsive">
                <div class="col-sm-6">
                    <div>
                        <h6>Created by <span id="venueOwner"></span></h6>
                        <p><span id="description"></span></p>
                        <p><span id="address"></span></p>
                    </div>

                </div>
            </div>
        </div>

    </div>
</div>

${js}

<input type="hidden" id="venueId" value="${venueId}"/>

</body>
</html>
