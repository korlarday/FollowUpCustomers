$(document).ready(function () {

    function filterText(text) {
        if (text !== null)
            return text.replace('<p>', '').replace('</p>', '');
    }

    var $userState = $("#userState").text();
    var $userDept = $("#userDept").text();

    var $isFullAccess = '';

    if ($userDept === 'CS')
        $isFullAccess = 'yes';
    else
        $isFullAccess = 'no';

    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/api_customers',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlhYjBhM2MyZmQzYzYwZTk5NDM1MGU2MjIxZDkzYzc5YTRhNzRkODVmZTRiZmNlNjVhMGJhNzg1NTJmMjEyOWRhZjJjYmIzZmEzNDNkYzc1In0.eyJhdWQiOiIyIiwianRpIjoiOWFiMGEzYzJmZDNjNjBlOTk0MzUwZTYyMjFkOTNjNzlhNGE3NGQ4NWZlNGJmY2U2NWEwYmE3ODU1MmYyMTI5ZGFmMmNiYjNmYTM0M2RjNzUiLCJpYXQiOjE1NzIxMjYxNTIsIm5iZiI6MTU3MjEyNjE1MiwiZXhwIjoxNjAzNzQ4NTUyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.NZtq_STtzhlZEaGbD2PEcYMLlq5o8g63BvUBxBOfN5CoLpW1LfYREMZpMKNXKodRAznUmIwqeaf33iYKrUlOwScGTNfsUU1sgO_FAuidu-5kI76PNiMnzDCzDwkCIdyO9hAdcJtPyjpzWhyC-awYXdw65D7j1BtivuLv6uBKOB5PWfS2gHPaqDgvJ0UJDdII7qXabXjN8DrARlFPwdxMaWILPdKpw6RZWfW5OuH-fPN5jl2bnivH_zNrZOzvb0qEwR7rbbVZkA-nP_qkwytX6kkbY0wi2Lw4kpprTJbt1b89t5D5Y1mlHCHXtsJdeATtQ7TBvF-6FA-4RcO03_cxik-MVk_cIHb4v2UzSuv3Pln-NS_fNlrMf762_LRRetuE8X3jQiOZddKRWGYW_g6RceFwtbYxM2LmztMUAZA4vSGSDPGA7F-bX_wRapYYwG4lvSpLnoXQdrY9vYtbYcjMLl4ip1Q6QsajHb6dhyYZw-d_M5VR3phE25E7Qa0fCpMUQAEBacQocuslRxSaCwIflsanHxuPweY-zmRy9F0RUPODX0lHuSSod-AZVzHDiur1izkEVxWy_L-lDban4-BXnBfuYvZ6e91LkXfIsflMpZVEwE7SSHbrJiZJbpEXreDQLW0HXEkqs15hX3RZCJtCFzVvh-8IZg8H05gtXUDApzo`
        },
        data: { state: $userState, isFullAccess: $isFullAccess },
        success: function (data) {
            var $data = data.data;
            var $body = $(".customer-body");
            var $from = data.from;
            if ($data.length === 0) {
                $("#pagination").hide();
                $("#table").hide();
                $("#no-record").show();
            }
            for (var i = 0; i < $data.length; i++) {
                var $cloneTr = $(".clone-tr:last").clone();

                $dob = moment($data[i].dob, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY');
                $creationTime = moment($data[i].created_at, 'YYYY-MM-DD HH:mm:ss').format('lll');

                $cloneTr.removeClass().addClass('clone-tr');
                $cloneTr.addClass('js-' + $data[i].id);

                $cloneTr.find('.serial').text($from++ + '.');
                $cloneTr.find('.js-name').text(filterText($data[i].fname) + ' ' + filterText($data[i].lname) + ' ' + filterText($data[i].oname));
                $cloneTr.find('.js-email').text($data[i].email);
                $cloneTr.find('.js-phone').text(filterText($data[i].phone));
                $cloneTr.find('.js-state').text($data[i].states);
                $cloneTr.find('.js-dob').text($dob);
                $cloneTr.find('.js-employer').text(filterText($data[i].employer));
                $cloneTr.find('.js-employer-address').text(filterText($data[i].employer_address));
                $cloneTr.find('.js-status').text($data[i].status);
                $cloneTr.find('.js-id').text($data[i].id);
                $cloneTr.find('.js-created-at').text($creationTime);


                //​$(".text_div").text(function () {
                //    return $(this).text().replace("contains", "hello everyone"); 
                //});

                // For Badge state
                if ($data[i].status === 1) {
                    $cloneTr.find('.js-badge')
                        .removeClass()
                        .addClass('badge js-badge badge-danger')
                        .text('New');
                } else if ($data[i].status === 2) {
                    $cloneTr.find('.js-badge')
                        .removeClass()
                        .addClass('badge js-badge badge-pending')
                        .text('Pending');
                } else if ($data[i].status === 4) {
                    $cloneTr.find('.js-badge')
                        .removeClass()
                        .addClass('badge js-badge badge-secondary')
                        .text('Unresolved');
                } else {
                    $cloneTr.find('.js-badge')
                        .removeClass()
                        .addClass('badge js-badge badge-complete')
                        .text('Registered');
                }

                $cloneTr.show();
                $body.append($cloneTr);
            }

            $('#loader').hide();
            $('#table').fadeIn(1000);
            $('#pagination').show();


            for (var i = 1; i <= data.last_page; i++) {
                var $pageLink = $('.p-link:last').clone().show();
                $pageLink.find('button').text(i);
                $pageLink.find('button').attr('data-link', '?page=' + i);
                if (i == 1) {
                    $pageLink.addClass('active');
                } else {
                    $pageLink.removeClass('active');
                }
                $('.pagination').append($pageLink);
            }
        },
        error: function () {
            alert("Error loading data");
        }
    });

    // When you click on paginate link button
    $(".pagination").on("click", ".p-link", function (e) {

        e.preventDefault();
        var $this = $(this);

        $(".pagination li").removeClass('active');
        $this.addClass('active');

        $('#loader').show();
        $('#table').hide();

        $(".clone-tr:not(':first')").remove();

        var $pageUrl = $this.find('button').attr('data-link');
        var $url = "http://127.0.0.1:8000/api/api_customers" + $pageUrl;
        $.ajax({
            method: 'GET',
            url: $url,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlhYjBhM2MyZmQzYzYwZTk5NDM1MGU2MjIxZDkzYzc5YTRhNzRkODVmZTRiZmNlNjVhMGJhNzg1NTJmMjEyOWRhZjJjYmIzZmEzNDNkYzc1In0.eyJhdWQiOiIyIiwianRpIjoiOWFiMGEzYzJmZDNjNjBlOTk0MzUwZTYyMjFkOTNjNzlhNGE3NGQ4NWZlNGJmY2U2NWEwYmE3ODU1MmYyMTI5ZGFmMmNiYjNmYTM0M2RjNzUiLCJpYXQiOjE1NzIxMjYxNTIsIm5iZiI6MTU3MjEyNjE1MiwiZXhwIjoxNjAzNzQ4NTUyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.NZtq_STtzhlZEaGbD2PEcYMLlq5o8g63BvUBxBOfN5CoLpW1LfYREMZpMKNXKodRAznUmIwqeaf33iYKrUlOwScGTNfsUU1sgO_FAuidu-5kI76PNiMnzDCzDwkCIdyO9hAdcJtPyjpzWhyC-awYXdw65D7j1BtivuLv6uBKOB5PWfS2gHPaqDgvJ0UJDdII7qXabXjN8DrARlFPwdxMaWILPdKpw6RZWfW5OuH-fPN5jl2bnivH_zNrZOzvb0qEwR7rbbVZkA-nP_qkwytX6kkbY0wi2Lw4kpprTJbt1b89t5D5Y1mlHCHXtsJdeATtQ7TBvF-6FA-4RcO03_cxik-MVk_cIHb4v2UzSuv3Pln-NS_fNlrMf762_LRRetuE8X3jQiOZddKRWGYW_g6RceFwtbYxM2LmztMUAZA4vSGSDPGA7F-bX_wRapYYwG4lvSpLnoXQdrY9vYtbYcjMLl4ip1Q6QsajHb6dhyYZw-d_M5VR3phE25E7Qa0fCpMUQAEBacQocuslRxSaCwIflsanHxuPweY-zmRy9F0RUPODX0lHuSSod-AZVzHDiur1izkEVxWy_L-lDban4-BXnBfuYvZ6e91LkXfIsflMpZVEwE7SSHbrJiZJbpEXreDQLW0HXEkqs15hX3RZCJtCFzVvh-8IZg8H05gtXUDApzo`
            },
            data: { state: $userState, isFullAccess: $isFullAccess },
            success: function (data) {
                var $data = data.data;
                var $body = $(".customer-body");
                var $from = data.from;
                for (var i = 0; i < $data.length; i++) {
                    var $cloneTr = $(".clone-tr:last").clone();

                    $cloneTr.removeClass().addClass('clone-tr');
                    $cloneTr.addClass('js-' + $data[i].id);

                    $dob = moment($data[i].dob, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY');
                    $creationTime = moment($data[i].created_at, 'YYYY-MM-DD HH:mm:ss').format('lll');

                    $cloneTr.find('.serial').text($from++ + '.');
                    $cloneTr.find('.js-name').text(filterText($data[i].fname) + ' ' + filterText($data[i].lname) + ' ' + filterText($data[i].oname));
                    $cloneTr.find('.js-email').text($data[i].email);
                    $cloneTr.find('.js-phone').text(filterText($data[i].phone));
                    $cloneTr.find('.js-state').text($data[i].states);
                    $cloneTr.find('.js-dob').text($dob);
                    $cloneTr.find('.js-employer').text(filterText($data[i].employer));
                    $cloneTr.find('.js-employer-address').text(filterText($data[i].employer_address));
                    $cloneTr.find('.js-status').text($data[i].status);
                    $cloneTr.find('.js-id').text($data[i].id);
                    $cloneTr.find('.js-created-at').text($creationTime);

                    // For Badge state
                    if ($data[i].status === 1) {
                        $cloneTr.find('.js-badge')
                            .removeClass()
                            .addClass('badge js-badge badge-danger')
                            .text('New');
                    } else if ($data[i].status === 2) {
                        $cloneTr.find('.js-badge')
                            .removeClass()
                            .addClass('badge js-badge badge-pending')
                            .text('Pending');
                    } else if ($data[i].status === 4) {
                        $cloneTr.find('.js-badge')
                            .removeClass()
                            .addClass('badge js-badge badge-secondary')
                            .text('Unresolved');
                    } else {
                        $cloneTr.find('.js-badge')
                            .removeClass()
                            .addClass('badge js-badge badge-complete')
                            .text('Registered');
                    }
                    $cloneTr.show();
                    $body.append($cloneTr);
                }

                $('#loader').hide();
                $('#table').fadeIn(1000);
            },
            error: function () {
                alert("Error loading data");
            }
        });
    })

    // When you click on edit
    $(".customer-body").on("click", "tr td .js-edit", function (e) {
        e.preventDefault();
        var $this = $(this);


        var $name = $this.parent().parent().find('.js-name').text();
        var $email = $this.parent().parent().find('.js-email').text();
        var $phone = $this.parent().parent().find('.js-phone').text();
        var $state = $this.parent().parent().find('.js-state').text();
        var $dob = $this.parent().parent().find('.js-dob').text();
        var $employer = $this.parent().parent().find('.js-employer').text();
        var $employerAddress = $this.parent().parent().find('.js-employer-address').text();
        var $status = $this.parent().parent().find('.js-status').text();
        var $id = $this.parent().parent().find('.js-id').text();
        var $createdAt = $this.parent().parent().find('.js-created-at').text();

        // fetch the image url
        $.ajax({
            url: 'http://127.0.0.1:8000/api/api_customers_getimage/' + $id,
            method: 'GET',
            success: function (data) {
                if (data.length === 0) {
                    $("#defaultImage").show();
                    $("#customerImage").hide();
                } else {
                    var imageSrc = 'http://127.0.0.1:8000' + data;
                    $("#customerImage").attr('src', imageSrc);
                    $("#defaultImage").hide();
                    $("#customerImage").show();
                }
            },
            error: function () {
                toastr.error("Unexpected error! Unable to get image at this time");
            }
        })

        $("#js-name").text($name);
        $("#js-email").text($email);
        $("#js-phone").text($phone);
        $("#js-state").text($state);
        $("#js-dob").text($dob);
        $("#js-employer").text($employer);
        $("#js-employer-address").text($employerAddress);
        $("#js-id").text($id);
        $("#js-created-at").text($createdAt);

        $("select").val($status);



        $("#openModal").click();
    });

    $("#js-save").on("click", function (e) {
        var $id = $("#js-id").text();
        var $selectedValue = $('#select').find(":selected").val();
        var $statusCode = parseInt($selectedValue);
        var $url = 'http://127.0.0.1:8000/api/api_customers/' + $id;


        $.ajax({
            url: $url,
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlhYjBhM2MyZmQzYzYwZTk5NDM1MGU2MjIxZDkzYzc5YTRhNzRkODVmZTRiZmNlNjVhMGJhNzg1NTJmMjEyOWRhZjJjYmIzZmEzNDNkYzc1In0.eyJhdWQiOiIyIiwianRpIjoiOWFiMGEzYzJmZDNjNjBlOTk0MzUwZTYyMjFkOTNjNzlhNGE3NGQ4NWZlNGJmY2U2NWEwYmE3ODU1MmYyMTI5ZGFmMmNiYjNmYTM0M2RjNzUiLCJpYXQiOjE1NzIxMjYxNTIsIm5iZiI6MTU3MjEyNjE1MiwiZXhwIjoxNjAzNzQ4NTUyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.NZtq_STtzhlZEaGbD2PEcYMLlq5o8g63BvUBxBOfN5CoLpW1LfYREMZpMKNXKodRAznUmIwqeaf33iYKrUlOwScGTNfsUU1sgO_FAuidu-5kI76PNiMnzDCzDwkCIdyO9hAdcJtPyjpzWhyC-awYXdw65D7j1BtivuLv6uBKOB5PWfS2gHPaqDgvJ0UJDdII7qXabXjN8DrARlFPwdxMaWILPdKpw6RZWfW5OuH-fPN5jl2bnivH_zNrZOzvb0qEwR7rbbVZkA-nP_qkwytX6kkbY0wi2Lw4kpprTJbt1b89t5D5Y1mlHCHXtsJdeATtQ7TBvF-6FA-4RcO03_cxik-MVk_cIHb4v2UzSuv3Pln-NS_fNlrMf762_LRRetuE8X3jQiOZddKRWGYW_g6RceFwtbYxM2LmztMUAZA4vSGSDPGA7F-bX_wRapYYwG4lvSpLnoXQdrY9vYtbYcjMLl4ip1Q6QsajHb6dhyYZw-d_M5VR3phE25E7Qa0fCpMUQAEBacQocuslRxSaCwIflsanHxuPweY-zmRy9F0RUPODX0lHuSSod-AZVzHDiur1izkEVxWy_L-lDban4-BXnBfuYvZ6e91LkXfIsflMpZVEwE7SSHbrJiZJbpEXreDQLW0HXEkqs15hX3RZCJtCFzVvh-8IZg8H05gtXUDApzo`
            },
            data: { status_code: $statusCode },
            success: function () {
                toastr.success('Status Changed successfully.');
                var $tr = $('.js-' + $id);
                $tr.hide();
                $tr.find('.js-status').text($statusCode);
                // For Badge state
                if ($statusCode === 1) {
                    $tr.find('.js-badge')
                        .removeClass()
                        .addClass('badge js-badge badge-danger')
                        .text('New');
                } else if ($statusCode === 2) {
                    $tr.find('.js-badge')
                        .removeClass()
                        .addClass('badge js-badge badge-pending')
                        .text('Pending');
                } else if ($statusCode === 4) {
                    $tr.find('.js-badge')
                        .removeClass()
                        .addClass('badge js-badge badge-secondary')
                        .text('Unresolved');
                } else {
                    $tr.find('.js-badge')
                        .removeClass()
                        .addClass('badge js-badge badge-complete')
                        .text('Registered');
                }

                $tr.fadeIn("slow");
            },
            error: function () {
                toastr.error('Unable to change status at the moment.');
            }
        })
    });
});