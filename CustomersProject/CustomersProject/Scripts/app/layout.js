
$(document).ready(function () {
    var $userState = $("#userState").text();
    var $userDept = $("#userDept").text();

    var $isFullAccess = '';

    if ($userDept === 'CS')
        $isFullAccess = 'yes';
    else
        $isFullAccess = 'no';

    $.ajax({
        method: 'GET',
        url: 'https://www.ieianchorpensions.com/api/api_customers_new',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjM3MmUyMWJkZTY3YTg1NGRkY2RlODc5NDI4ZTgwNjBiMzNjZDcwYjA1YzEwOGY1NDY0MDEzOGJlNzA1MTQxZGNmMDdhNDQ5ZmU3MTY0ZTJkIn0.eyJhdWQiOiIyIiwianRpIjoiMzcyZTIxYmRlNjdhODU0ZGRjZGU4Nzk0MjhlODA2MGIzM2NkNzBiMDVjMTA4ZjU0NjQwMTM4YmU3MDUxNDFkY2YwN2E0NDlmZTcxNjRlMmQiLCJpYXQiOjE1NzIyNDgzNzQsIm5iZiI6MTU3MjI0ODM3NSwiZXhwIjoxNjAzODcwNzc0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Ssf-UoLjeADYDbi2s1c9oCtKLC3iNkm_6dv80QaigqFZ-iQ8J2u1jBewuaN48HH0XN6UzCbVPQblU8R4v96H0BaSpf3RBA1ZKxjB5mZierxvrEZfKrZ4dMcqClgvS9r6xnVPbRno35OXQ7Kc3wsyWWCz_WEkbfPcpc6uRfVV5WTvy0k-D3C4e4v7nNiBxmhThBVLsgJrptmeY0nGjArVzLj8-F5S-2RNl7Uws1xRbZlMH4zGPAIkxxTjPDZGxnDn0NyM6Xq2CzPel4_XhHU1PQ4t21mUqMybgMS75mJ9EpEFnmRqHs8o-_NXgym5163bANSHjJLBQf6QVh-pEzN5BJ6WEdd8MSkHcgcZzK7p85vZ0tlTeVcxd3VzObXmvY5qW5RK04gWkhqLXtMWGt5GJI0BMKytxy_zdUEMHFMO1Be_gg_b4bIni1saAlgz5jOLDWYPLMXGVNcbw6QOWxxWsh8UwjUoqpFURGFDzhBqcmUPf7_XJd19FB7gSHzfqdazNqFbIX45r8AGgMZgk5bmXVSJeCwLs8U9wZM3cWYvdh5IZN5ReUnKJF1sM5Z-4gkGmM-2G3zsND9YplBz2B9OyNeCe1r5p2-nwFdET96TtnOLw0WqN6B3b0ovaGiEjIKpByq-L5rBtwEzSYxPOM800vX8ji4N9Z35f5GC1oVmzOA`
        },
        data: { state: $userState, isFullAccess: $isFullAccess },
        success: function (data) {
            $("#notification span").text(data.total).fadeIn(1000);
            $("#customer-count").text(data.total);
        }
    });
});