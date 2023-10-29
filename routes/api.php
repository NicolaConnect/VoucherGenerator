<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/generate', function(Request $request) {
    $unifi = new UniFi_API\Client(config('services.controller.username'), config('services.controller.password'), config('services.controller.url'), config('services.controller.site_id'));
    $unifi->login();

    $vouchers = $unifi->create_voucher(
        $request->type === '15-minutes' ? 15 : 60,
        1,
        1,
        "Generato via UI Tablet",
        $request->type === '15-minutes' ? 20480 : 51200,
        $request->type === '60-minutes' ? 20480 : 51200,
        null
    );

    $voucher = $unifi->stat_voucher($vouchers[0]->create_time);
    $unifi->logout();

    return response()->json([
        'code' => str_split($voucher[0]->code, 5)[0] . '-' . str_split($voucher[0]->code, 5)[1]
    ]);
});
