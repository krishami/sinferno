$(document).ready(function () {
    var venueId = $("#venueId").val();

    SN.ajaxHelper.makeCall("/venue/single/" + venueId, "GET", {}, function (response) {
        $("#venueName").html(_.escape(response.name));
        $("#description").html(_.escape(response.description));
        $("#venueOwner").html(_.escape(response.owner.fullName));

        var address1 = response.address1;
        var address2 = response.address2;
        var city = response.city;
        var state = response.state;
        var postalCode = response.postalCode;
        var countryName = response.country;

        var address = "";
        if (address1 && address1 !== "") {
            address += _.escape(address1) + "<br/>";
        }
        if (address2 && address2 !== "") {
            address += _.escape(address2) + "<br/>";
        }
        if (city && city !== "") {
            address += _.escape(city);
            if (state && state !== "") {
                address += ", " + _.escape(state);
            }
            if (postalCode && postalCode !== "") {
                address += " " + _.escape(postalCode);
            }
            address += "<br/>";
        }
        else {
            if (state && state !== "") {
                address += _.escape(state);
                if (postalCode && postalCode !== "") {
                    address += " " + _.escape(postalCode);
                }
                address += "<br/>";
            }
            else {
                if (postalCode && postalCode !== "") {
                    address += _.escape(postalCode) + "<br/>";
                }
            }

        }

        if (countryName && countryName !== "") {
            address += _.escape(countryName) + "<br/>";
        }

        $("#address").html(address);
    });

});