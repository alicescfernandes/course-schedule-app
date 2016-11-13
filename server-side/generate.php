<!doctype html>
<html>
<head>
</head>
<body>

<h2>Hi there! This page is used to generate the secret code that you must use to validate the app</h2>
<p>Please pay attention that all the secret codes are <b>valid for 24 hours</b>,and if you try to validade after those 24 hours, you have to generate a new one.<br> If you already generated your secret code, then the authorization token is no longer usefull to you. <br> Also, if you secret code is validated, it cant no longer be used to validate another app.</p>

<form action="getSecret.php" method="get">
<label for="token">Please type in your authorization token</label>
<input id="token" name="token" type="text" placeholder="your token">
<input type="submit">
</form>


?php
if (isset($_GET['token'])) { //Check if token is on get
    
    $doc = new DOMDocument(); //Cria uma nova instance de DOMDocument
    $doc->load('tokens.xml'); //Carregar tokens.xml
    $tokens = $doc->getElementsByTagName('token'); //Pegar na tag base
    
    foreach ($tokens as $token) {
        $id         = $token->attributes->item(0)->nodeValue; //Definir variáveis
        $validation = $token->attributes->item(1)->nodeValue; //Definir variáveis
        
        if ($_GET['token'] == $id) { //Verificar se o token existe
            if ($validation == 'false') { //se ainda não foi validado:
                $token->setAttribute('validation', 'true'); //Se existir, alterar para true, para validar o token
                $doc->save('tokens.xml'); //gravar xml
                
                $code = ""; //Preparar código
                //generate secret
                for ($i = 0; $i != 11; $i++) {
                    $code .= rand(0, 10);
                }
                
                $doc = new DOMDocument();
                $doc->load('secrets.xml');
                $secrets    = $doc->getElementsByTagName('secrets')->item(0);
                $new_secret = $doc->createElement('secret');
                $new_secret->setAttribute('id', $code);
                $new_secret->setAttribute('validation', 'false');
                $new_secret->setAttribute('expiry', strtotime('tomorrow'));
                $new_secret = $secrets->appendChild($new_secret);
                $doc->save('secrets.xml');
                echo ("<h3>Your secret is:" . $code . "</h3>");
                
            } else {
                echo ('<br>this token was already used');
            }
        } else {
            echo ('token hasnt been found');
        }
        
    }
}
?>

</body>
</html>