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

    // When you click on search button
    $("#searchButton").on("click", function (e) {
        e.preventDefault();
        $searchText = $("#searchInput").val();
        if ($searchText === '') {
            toastr.error("Please enter text to search");
            return;
        }
        $("#card-body").show();
        $('#loader').show();
        $('#no-record').hide();
        $(".p-link:not(':first')").remove();
        $(".clone-tr:not(':first')").remove();

        $.ajax({
            method: 'GET',
            data: { search: $searchText, state: $userState, isFullAccess: $isFullAccess },
            url: 'https://www.ieianchorpensions.com/api/api_customers_search',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM3MmUyMWJkZTY3YTg1NGRkY2RlODc5NDI4ZTgwNjBiMzNjZDcwYjA1YzEwOGY1NDY0MDEzOGJlNzA1MTQxZGNmMDdhNDQ5ZmU3MTY0ZTJkIn0.eyJhdWQiOiIyIiwianRpIjoiMzcyZTIxYmRlNjdhODU0ZGRjZGU4Nzk0MjhlODA2MGIzM2NkNzBiMDVjMTA4ZjU0NjQwMTM4YmU3MDUxNDFkY2YwN2E0NDlmZTcxNjRlMmQiLCJpYXQiOjE1NzIyNDgzNzQsIm5iZiI6MTU3MjI0ODM3NSwiZXhwIjoxNjAzODcwNzc0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Ssf-UoLjeADYDbi2s1c9oCtKLC3iNkm_6dv80QaigqFZ-iQ8J2u1jBewuaN48HH0XN6UzCbVPQblU8R4v96H0BaSpf3RBA1ZKxjB5mZierxvrEZfKrZ4dMcqClgvS9r6xnVPbRno35OXQ7Kc3wsyWWCz_WEkbfPcpc6uRfVV5WTvy0k-D3C4e4v7nNiBxmhThBVLsgJrptmeY0nGjArVzLj8-F5S-2RNl7Uws1xRbZlMH4zGPAIkxxTjPDZGxnDn0NyM6Xq2CzPel4_XhHU1PQ4t21mUqMybgMS75mJ9EpEFnmRqHs8o-_NXgym5163bANSHjJLBQf6QVh-pEzN5BJ6WEdd8MSkHcgcZzK7p85vZ0tlTeVcxd3VzObXmvY5qW5RK04gWkhqLXtMWGt5GJI0BMKytxy_zdUEMHFMO1Be_gg_b4bIni1saAlgz5jOLDWYPLMXGVNcbw6QOWxxWsh8UwjUoqpFURGFDzhBqcmUPf7_XJd19FB7gSHzfqdazNqFbIX45r8AGgMZgk5bmXVSJeCwLs8U9wZM3cWYvdh5IZN5ReUnKJF1sM5Z-4gkGmM-2G3zsND9YplBz2B9OyNeCe1r5p2-nwFdET96TtnOLw0WqN6B3b0ovaGiEjIKpByq-L5rBtwEzSYxPOM800vX8ji4N9Z35f5GC1oVmzOA`
            },
            success: function (data) {
                var $data = data.data;
                var $body = $(".customer-body");
                var $from = data.from;
                if ($data.length === 0) {
                    $("#pagination").hide();
                    $("#table").hide();
                    $('#loader').hide();
                    $("#no-record").show();
                }
                for (var i = 0; i < $data.length; i++) {
                    var $cloneTr = $(".clone-tr:last").clone();

                    $cloneTr.removeClass().addClass('clone-tr');
                    $cloneTr.addClass('js-' + $data[i].id);

                    $dob = moment($data[i].dob, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY');
                    $creationTime = moment($data[i].created_at, 'YYYY-MM-DD HH:mm:ss').format('ll');

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
                alert("Error loading data, please check your internet connection.");
                location.reload();
            }
        });
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
        var $url = "https://www.ieianchorpensions.com/api/api_customers_search" + $pageUrl;
        $.ajax({
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM3MmUyMWJkZTY3YTg1NGRkY2RlODc5NDI4ZTgwNjBiMzNjZDcwYjA1YzEwOGY1NDY0MDEzOGJlNzA1MTQxZGNmMDdhNDQ5ZmU3MTY0ZTJkIn0.eyJhdWQiOiIyIiwianRpIjoiMzcyZTIxYmRlNjdhODU0ZGRjZGU4Nzk0MjhlODA2MGIzM2NkNzBiMDVjMTA4ZjU0NjQwMTM4YmU3MDUxNDFkY2YwN2E0NDlmZTcxNjRlMmQiLCJpYXQiOjE1NzIyNDgzNzQsIm5iZiI6MTU3MjI0ODM3NSwiZXhwIjoxNjAzODcwNzc0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Ssf-UoLjeADYDbi2s1c9oCtKLC3iNkm_6dv80QaigqFZ-iQ8J2u1jBewuaN48HH0XN6UzCbVPQblU8R4v96H0BaSpf3RBA1ZKxjB5mZierxvrEZfKrZ4dMcqClgvS9r6xnVPbRno35OXQ7Kc3wsyWWCz_WEkbfPcpc6uRfVV5WTvy0k-D3C4e4v7nNiBxmhThBVLsgJrptmeY0nGjArVzLj8-F5S-2RNl7Uws1xRbZlMH4zGPAIkxxTjPDZGxnDn0NyM6Xq2CzPel4_XhHU1PQ4t21mUqMybgMS75mJ9EpEFnmRqHs8o-_NXgym5163bANSHjJLBQf6QVh-pEzN5BJ6WEdd8MSkHcgcZzK7p85vZ0tlTeVcxd3VzObXmvY5qW5RK04gWkhqLXtMWGt5GJI0BMKytxy_zdUEMHFMO1Be_gg_b4bIni1saAlgz5jOLDWYPLMXGVNcbw6QOWxxWsh8UwjUoqpFURGFDzhBqcmUPf7_XJd19FB7gSHzfqdazNqFbIX45r8AGgMZgk5bmXVSJeCwLs8U9wZM3cWYvdh5IZN5ReUnKJF1sM5Z-4gkGmM-2G3zsND9YplBz2B9OyNeCe1r5p2-nwFdET96TtnOLw0WqN6B3b0ovaGiEjIKpByq-L5rBtwEzSYxPOM800vX8ji4N9Z35f5GC1oVmzOA`
            },
            data: { search: $searchText, state: $userState, isFullAccess: $isFullAccess },
            url: $url,
            success: function (data) {
                var $data = data.data;
                if ($data.length === 0) {
                    $("#pagination").hide();
                    $("#table").hide();
                    $("#no-record").show();
                }
                var $body = $(".customer-body");
                var $from = data.from;
                for (var i = 0; i < $data.length; i++) {
                    var $cloneTr = $(".clone-tr:last").clone();

                    $cloneTr.removeClass().addClass('clone-tr');
                    $cloneTr.addClass('js-' + $data[i].id);

                    $dob = moment($data[i].dob, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do YYYY');
                    $creationTime = moment($data[i].created_at, 'YYYY-MM-DD HH:mm:ss').format('ll');

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
                alert("Error loading data, please check your internet connection.");
                location.reload();
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
            url: 'https://www.ieianchorpensions.com/api/api_customers_getimage/' + $id,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM3MmUyMWJkZTY3YTg1NGRkY2RlODc5NDI4ZTgwNjBiMzNjZDcwYjA1YzEwOGY1NDY0MDEzOGJlNzA1MTQxZGNmMDdhNDQ5ZmU3MTY0ZTJkIn0.eyJhdWQiOiIyIiwianRpIjoiMzcyZTIxYmRlNjdhODU0ZGRjZGU4Nzk0MjhlODA2MGIzM2NkNzBiMDVjMTA4ZjU0NjQwMTM4YmU3MDUxNDFkY2YwN2E0NDlmZTcxNjRlMmQiLCJpYXQiOjE1NzIyNDgzNzQsIm5iZiI6MTU3MjI0ODM3NSwiZXhwIjoxNjAzODcwNzc0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Ssf-UoLjeADYDbi2s1c9oCtKLC3iNkm_6dv80QaigqFZ-iQ8J2u1jBewuaN48HH0XN6UzCbVPQblU8R4v96H0BaSpf3RBA1ZKxjB5mZierxvrEZfKrZ4dMcqClgvS9r6xnVPbRno35OXQ7Kc3wsyWWCz_WEkbfPcpc6uRfVV5WTvy0k-D3C4e4v7nNiBxmhThBVLsgJrptmeY0nGjArVzLj8-F5S-2RNl7Uws1xRbZlMH4zGPAIkxxTjPDZGxnDn0NyM6Xq2CzPel4_XhHU1PQ4t21mUqMybgMS75mJ9EpEFnmRqHs8o-_NXgym5163bANSHjJLBQf6QVh-pEzN5BJ6WEdd8MSkHcgcZzK7p85vZ0tlTeVcxd3VzObXmvY5qW5RK04gWkhqLXtMWGt5GJI0BMKytxy_zdUEMHFMO1Be_gg_b4bIni1saAlgz5jOLDWYPLMXGVNcbw6QOWxxWsh8UwjUoqpFURGFDzhBqcmUPf7_XJd19FB7gSHzfqdazNqFbIX45r8AGgMZgk5bmXVSJeCwLs8U9wZM3cWYvdh5IZN5ReUnKJF1sM5Z-4gkGmM-2G3zsND9YplBz2B9OyNeCe1r5p2-nwFdET96TtnOLw0WqN6B3b0ovaGiEjIKpByq-L5rBtwEzSYxPOM800vX8ji4N9Z35f5GC1oVmzOA`
            },
            method: 'GET',
            success: function (data) {
                if (data.length === 0) {
                    $("#defaultImage").show();
                    $("#customerImage").hide();
                } else {
                    var imageSrc = 'https://www.ieianchorpensions.com/IEIWEBNOV2019/public' + data;
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
        var $url = 'https://www.ieianchorpensions.com/api/api_customers/' + $id;


        $.ajax({
            url: $url,
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM3MmUyMWJkZTY3YTg1NGRkY2RlODc5NDI4ZTgwNjBiMzNjZDcwYjA1YzEwOGY1NDY0MDEzOGJlNzA1MTQxZGNmMDdhNDQ5ZmU3MTY0ZTJkIn0.eyJhdWQiOiIyIiwianRpIjoiMzcyZTIxYmRlNjdhODU0ZGRjZGU4Nzk0MjhlODA2MGIzM2NkNzBiMDVjMTA4ZjU0NjQwMTM4YmU3MDUxNDFkY2YwN2E0NDlmZTcxNjRlMmQiLCJpYXQiOjE1NzIyNDgzNzQsIm5iZiI6MTU3MjI0ODM3NSwiZXhwIjoxNjAzODcwNzc0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Ssf-UoLjeADYDbi2s1c9oCtKLC3iNkm_6dv80QaigqFZ-iQ8J2u1jBewuaN48HH0XN6UzCbVPQblU8R4v96H0BaSpf3RBA1ZKxjB5mZierxvrEZfKrZ4dMcqClgvS9r6xnVPbRno35OXQ7Kc3wsyWWCz_WEkbfPcpc6uRfVV5WTvy0k-D3C4e4v7nNiBxmhThBVLsgJrptmeY0nGjArVzLj8-F5S-2RNl7Uws1xRbZlMH4zGPAIkxxTjPDZGxnDn0NyM6Xq2CzPel4_XhHU1PQ4t21mUqMybgMS75mJ9EpEFnmRqHs8o-_NXgym5163bANSHjJLBQf6QVh-pEzN5BJ6WEdd8MSkHcgcZzK7p85vZ0tlTeVcxd3VzObXmvY5qW5RK04gWkhqLXtMWGt5GJI0BMKytxy_zdUEMHFMO1Be_gg_b4bIni1saAlgz5jOLDWYPLMXGVNcbw6QOWxxWsh8UwjUoqpFURGFDzhBqcmUPf7_XJd19FB7gSHzfqdazNqFbIX45r8AGgMZgk5bmXVSJeCwLs8U9wZM3cWYvdh5IZN5ReUnKJF1sM5Z-4gkGmM-2G3zsND9YplBz2B9OyNeCe1r5p2-nwFdET96TtnOLw0WqN6B3b0ovaGiEjIKpByq-L5rBtwEzSYxPOM800vX8ji4N9Z35f5GC1oVmzOA`
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