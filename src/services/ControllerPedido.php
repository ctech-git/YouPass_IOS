<?php
use ReallySimpleJWT\Token;
require_once '../getData/getData.php';
require_once '../login/model/connect.class.php';
$token  = (isset($_GET['token'])) ? $_GET['token'] : '';

$id = ReturnToken($token);

$id2 = $id['user_id'];


$pdo = ConexaoPDO::getConexao();
	$pdo->setAttribute( PDO::ATTR_ERRMODE,  PDO::ERRMODE_EXCEPTION );
	
	$stmt = $pdo->prepare("SELECT email,isActive,type,dataPacote,tempoPacote FROM users 
  WHERE local_user_id = '$id2'");
	$stmt->execute();
	$userData = $stmt->fetchAll();
		if (count($userData) > 0) {
	        $stmt2 = $pdo->prepare('SELECT name,surname, picture,date_birth,cpf,genero,telefone,
          cep,endereco,rua,complemento,bairro,
	        cidade FROM personal_user_info WHERE user_id = "'.$id2.'"');
	        $stmt2->execute();
	        $userData2 = $stmt2->fetchAll();

		}else{
		    echo false;
		}


$nome = $userData2[0]['name'];
$surname = $userData2[0]['surname'];
$email = $userData2[0]['email'];
$cep = $userData2[0]['cep'];
$cpf = $userData2[0]['cpf'];
$cpf = str_replace('.','',$cpf);
$cpf = str_replace('.','',$cpf);
$cpf = str_replace('-','',$cpf);
$bairro = $userData2[0]['bairro'];
$endereco = $userData2[0]['rua'];
$telefone = $userData2[0]['telefone'];

$referencia = $userData2[0]['complemento'];

$cidade = $userData2[0]['cidade'];
$sexo = $userData2[0]['genero'];
$estado = 'PA';
$nomePlano  = (isset($_GET['nomePlano'])) ? $_GET['nomePlano'] : '';
$plano  = (isset($_GET['plano'])) ? $_GET['plano'] : '';
$valor_total  = (isset($_GET['valor_total'])) ? $_GET['valor_total'] : '';
$numero_cartao  = (isset($_GET['cartao'])) ? $_GET['cartao'] : '';
$nome_impresso  = (isset($_GET['nome_cartao'])) ? $_GET['nome_cartao'] : '';
$data_validade  = (isset($_GET['validade'])) ? $_GET['validade'] : '';
$cvc  = (isset($_GET['cvc'])) ? $_GET['cvc'] : '';
$compras  = (isset($_GET['pedido'])) ? $_GET['pedido'] : '';
$qtd_parcelas  = 1;
$data_validade2='';
$cupom  = (isset($_GET['cupom'])) ? $_GET['cupom'] : '';
$metodo_pagamento  = (isset($_GET['type'])) ? $_GET['type'] : '';
if($metodo_pagamento=='visa'){
    $metodo_pagamento = 3;
}else if($metodo_pagamento=='elo'){
    $metodo_pagamento = 16;
} else if($metodo_pagamento=='master-card'){
    $metodo_pagamento = 4;
} else if($metodo_pagamento=='hiper-card'){
    $metodo_pagamento = 20;
} else if($metodo_pagamento=='hiper'){
    $metodo_pagamento = 25;
} else if($metodo_pagamento=='aura'){
    $metodo_pagamento = 18;
} else if($metodo_pagamento=='discover'){
    $metodo_pagamento = 15;
}
$forma_pagamento = 'Cartão';
$DT = new DateTime( 'now', new DateTimeZone( 'America/Sao_Paulo') );
$data_compra= $DT->format( "d/m/Y H:i:s" );
$data["token_account"] = "5f2251c1c680dd8";

$data["customer"]["contacts"][1]["type_contact"] = "$sexo";
$data["customer"]["contacts"][1]["number_contact"] = "$telefone";
$data["customer"]["addresses"][1]["type_address"] = "D";
$data["customer"]["addresses"][1]["postal_code"] = "$cep";
$data["customer"]["addresses"][1]["street"] = "$endereco";
$data["customer"]["addresses"][1]["number"] = "sn";
$data["customer"]["addresses"][1]["neighborhood"] = "$bairro";
$data["customer"]["addresses"][1]["city"] = "$cidade";
$data["customer"]["addresses"][1]["state"] = "$estado";
$data["customer"]["name"] = "$nome"." "."$sobrenome";
$data["customer"]["cpf"] = "$cpf";
$data["customer"]["email"] = "$email";
  $data["transaction_product"][1]["description"] = $nomePlano;
  $data["transaction_product"][1]["quantity"] = 1;
  $data["transaction_product"][1]["price_unit"] = $valor_total;

$data["transaction"]["shipping_type"] = "D";
$data["transaction"]["shipping_price"] = 0;
$data["transaction"]["url_notification"] = "https://www.api.youpass.portalctech.com.br/busca/callback.php";
$data["transaction"]["customer_ip"] = "127.0.0.1";

$data["transaction"]["price_discount"] = 0;


$data_validade2 = $data_validade;
$data_validade = explode("/",$data_validade);
$expiracao_mes = $data_validade[0];
$expiracao_ano = $data_validade[1];
$data["payment"]["card_name"] = "$nome_impresso";
$data["payment"]["card_number"] = "$numero_cartao";
$data["payment"]["card_expdate_month"] = "$expiracao_mes";
$data["payment"]["card_expdate_year"] = "20"."$expiracao_ano";
$data["payment"]["card_cvv"] = "$cvc";
$data["payment"]["split"] = "$qtd_parcelas";
$data["payment"]["payment_method_id"] = "$metodo_pagamento";

$url = "https://api.intermediador.yapay.com.br/api/v3/transactions/payment";

ob_start();

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$yapay =curl_exec($ch);

$teste = json_decode($yapay);
$compras = json_encode($compras, JSON_UNESCAPED_UNICODE);

 $order_number = (isset($teste->data_response->transaction->order_number)) ? $teste->data_response->transaction->order_number : '';
 $status_id = (isset($teste->data_response->transaction->status_id)) ? $teste->data_response->transaction->status_id : '';
 $token_transaction = (isset($teste->data_response->transaction->token_transaction)) ? $teste->data_response->transaction->token_transaction : '';
 $payment_response = (isset($teste->data_response->transaction->payment->payment_response)) ? $teste->data_response->transaction->payment->payment_response : '';
 $general_errors = (isset($teste->error_response->general_errors[0]->code)) ? $teste->error_response->general_errors[0]->code : '';
 $validation_errors = (isset($teste->error_response->validation_errors[0]->code)) ? $teste->error_response->validation_errors[0]->code : '';
 $transaction_id = (isset($teste->data_response->transaction->transaction_id)) ? $teste->data_response->transaction->transaction_id : '';
 $status_id = (isset($teste->data_response->transaction->status_id)) ? $teste->data_response->transaction->status_id : '';
 include_once 'connect.php';
 $conexao = new Conexao();
 $data = array();
      $status_real = 'Compra Efetuada';
      
            if($general_errors=="003010"){
              echo "Forma de Pagamento Inválida";
            }else if($validation_errors=="18"){
              echo "Ano deve ser maior ou igual a 2020";
            }else{
                
                     if ($payment_response=="APPROVED") {
                         
                          if($status_id==87){
                              $status_real= "Aguardando Aprovação";
                            }
                            if($status_id==89){
                                cancelarCompra('5f2251c1c680dd8','5f2251c1c680dd8',$transaction_id);
                            $status_real= "Reprovada";
                            }
                            if($status_id==24){
                                $status_real= "Em Contestação";
                            }
                            if($status_id==7){
                                cancelarCompra('5f2251c1c680dd8','5f2251c1c680dd8',$transaction_id);
                                $status_real= "Cancelada";
                            }
                            if($status_id==6){
                                $status_real= "Aprovada";
                            }
                            if($status_id==5){
                                $status_real= "Em Processamento";
                            }
                            if($status_id==4){
                                $status_real= "Aguardando Pagamento";
                            }
                       
                       ob_end_clean();
                       curl_close($ch);
                     }else if ($payment_response=="NOT APPROVED") {
                         cancelarCompra('5f2251c1c680dd8','5f2251c1c680dd8',$transaction_id);
                      //CANCELAR QUANDO NAO E APROVADO
                       $status_real= "Reprovada";
                      
                    }
                     $mysqli = $conexao->getConexao();
                     $DT = new DateTime( 'now', new DateTimeZone( 'America/Sao_Paulo') );
                     $data_adicionado= $DT->format( "d/m/Y H:i:s" );
                     $sql = "INSERT INTO compras (nome_completo
                       , telefone
                       , endereco
                       , bairro
                       , forma_pagamento
                       , plano
                       , valor
                       , data_pedido,status, 
                        cpf,cupom,
                       id_usuario,
                       order_number,status_id,token_transaction,
                    transaction_id
                     ) VALUES('$nome', '$telefone', '$endereco',
                        '$bairro',
                       '$forma_pagamento', 
                       '$nomePlano', '$valor_total',
                       '$data_adicionado','$status_real','$cpf','$cupom',
                       '$id2',
                       '$order_number','$status_id','$token_transaction','$transaction_id')";
                       $status = mysqli_query($mysqli, $sql)  or die ("Erro ao buscar evento no banco. ".mysqli_error($mysqli));
                         if ($status) {
                           echo $status_real;
                         }else {
                           echo false;
                         }

                
            }
            
            
            function cancelarCompra($acess_token,$token_account,$transaction_id){
                // $data["access_token"] = $acess_token;
                      // $data["transaction_id"] = $transaction_id;
                      // $data["token_account"] = $token_account;
                      // $url = "https://api.intermediador.yapay.com.br/api/v3/transactions/cancel";
                      // ob_start();
                      // $ch = curl_init();
                      // curl_setopt($ch, CURLOPT_URL, $url);
                      // curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
                      // curl_setopt($curl, CURLOPT_POST, true);
                      // curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
                      // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json-patch+json'));
                      // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                      // $yapay =curl_exec($ch);
                      // ob_end_clean();
                      // curl_close($ch);
                      // echo $yapay;
            }
          