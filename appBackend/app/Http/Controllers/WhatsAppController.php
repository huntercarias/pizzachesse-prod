<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;

class WhatsAppController extends Controller
{
    public function sendMessage(Request $request)
    {
        $accountSid = 'AC073a61c048ef3e985129688edace329b'; // Reemplaza con tu SID de cuenta de Twilio
        $authToken = 'dbedac2d8e906ff0916d0238b9eddde2'; // Reemplaza con tu token de autenticación de Twilio
        $twilioNumber = '+13158738157'; // Reemplaza con tu número de Twilio

        $client = new Client($accountSid, $authToken);

        $message = $client->messages->create(
            '+50238173453', // Número de teléfono del destinatario (formato: '+1234567890')
            [
                'from' => $twilioNumber,
                'body' => 'ESTE ES UN MENSAJE DE PRUEBA',
            ]
        );

        // Verificación de si el mensaje se envió correctamente
        if ($message->sid) {
            return response()->json(['status' => 'success', 'message' => 'Mensaje enviado con éxito']);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Error al enviar el mensaje']);
        }
    }
}
