<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class sendPost extends Mailable
{
    use Queueable, SerializesModels;

    public $details;

    /** create new message instance
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

     /**
      * @return $this
      */
     public function build()
     {
         return $this->view('mail.view');
     }
}
