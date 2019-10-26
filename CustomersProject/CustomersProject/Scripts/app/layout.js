
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
        url: 'http://127.0.0.1:8000/api/api_customers_new',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlhYjBhM2MyZmQzYzYwZTk5NDM1MGU2MjIxZDkzYzc5YTRhNzRkODVmZTRiZmNlNjVhMGJhNzg1NTJmMjEyOWRhZjJjYmIzZmEzNDNkYzc1In0.eyJhdWQiOiIyIiwianRpIjoiOWFiMGEzYzJmZDNjNjBlOTk0MzUwZTYyMjFkOTNjNzlhNGE3NGQ4NWZlNGJmY2U2NWEwYmE3ODU1MmYyMTI5ZGFmMmNiYjNmYTM0M2RjNzUiLCJpYXQiOjE1NzIxMjYxNTIsIm5iZiI6MTU3MjEyNjE1MiwiZXhwIjoxNjAzNzQ4NTUyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.NZtq_STtzhlZEaGbD2PEcYMLlq5o8g63BvUBxBOfN5CoLpW1LfYREMZpMKNXKodRAznUmIwqeaf33iYKrUlOwScGTNfsUU1sgO_FAuidu-5kI76PNiMnzDCzDwkCIdyO9hAdcJtPyjpzWhyC-awYXdw65D7j1BtivuLv6uBKOB5PWfS2gHPaqDgvJ0UJDdII7qXabXjN8DrARlFPwdxMaWILPdKpw6RZWfW5OuH-fPN5jl2bnivH_zNrZOzvb0qEwR7rbbVZkA-nP_qkwytX6kkbY0wi2Lw4kpprTJbt1b89t5D5Y1mlHCHXtsJdeATtQ7TBvF-6FA-4RcO03_cxik-MVk_cIHb4v2UzSuv3Pln-NS_fNlrMf762_LRRetuE8X3jQiOZddKRWGYW_g6RceFwtbYxM2LmztMUAZA4vSGSDPGA7F-bX_wRapYYwG4lvSpLnoXQdrY9vYtbYcjMLl4ip1Q6QsajHb6dhyYZw-d_M5VR3phE25E7Qa0fCpMUQAEBacQocuslRxSaCwIflsanHxuPweY-zmRy9F0RUPODX0lHuSSod-AZVzHDiur1izkEVxWy_L-lDban4-BXnBfuYvZ6e91LkXfIsflMpZVEwE7SSHbrJiZJbpEXreDQLW0HXEkqs15hX3RZCJtCFzVvh-8IZg8H05gtXUDApzo`
        },
        data: { state: $userState, isFullAccess: $isFullAccess },
        success: function (data) {
            $("#notification span").text(data.total).fadeIn(1000);
            $("#customer-count").text(data.total);
        }
    });
});