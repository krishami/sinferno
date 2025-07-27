<#-- @ftlvariable name="" type="com.sinferno.view.sportsEntity.EntityDisplayView" -->

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
                <span id="entityName"></span>
                [<span id="entityAbbrev"></span>]
            </h1>

            <div class="table-responsive">

                <div class="col-sm-6">
                    <div>
                        <h6>Created by <span id="entityOwner"></span></h6>
                        <p><span id="entityDesc"></span></p>
                    </div>

                    <div id="associatedPlayers">
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

${js}

<input type="hidden" id="entityId" value="${entityId}"/>

</body>
</html>


