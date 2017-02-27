<?php
    function getInstance() {
        $conecta = mysql_connect("50.116.86.94", "vitor632_root", "guizo123", "vitor632_wis");
        return $conecta;
    }

    function executeQuery($sql, $conexao){
        $result = mysql_query($sql, $conexao);
        return $result;
    }

    function conectaPDO(){
        $pdo = new PDO('mysql:host=50.116.86.94;dbname=vitor632_wis', 'vitor632_root', 'guizo123');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }

    function getUserByEmailWis($userEmail, $pdo){
        $consulta = $pdo->prepare("SELECT * FROM Usuario where email = :email;");
        $consulta->bindParam(':email', $userEmail, PDO::PARAM_STR);
        $consulta->execute();
        $linha = $consulta->fetch(PDO::FETCH_ASSOC);
        $user = (object) array('firstname' => $linha['FIRSTNAME'], 'secondname' => $linha['SECONDNAME'], 'password' => $linha['Password']);
        return $user;
    }

    function getMaxIdUser($pdo){
        $consulta = $pdo->query("SELECT MAX(ID) as ID FROM Usuario");
        $linha = $consulta->fetch(PDO::FETCH_ASSOC);
        return $linha['ID'] + 1;
    }

    function getMaxIdCarros($pdo){
        $consulta = $pdo->query("SELECT MAX(ID) as ID FROM Carros");
        $linha = $consulta->fetch(PDO::FETCH_ASSOC);
        return $linha['ID'] + 1;
    }

    function createCar($carro, $ano, $km, $valor, $pdo){
        $id = getMaxIdCarros($pdo);
        $consulta = $pdo->prepare("INSERT INTO Carros(ID, CARRO, ANO, KM, VALOR) VALUES (:id, :carro, :ano, :km, :valor)");
        $consulta->execute(array(':id' => $id, ':carro' => $carro, ':ano' => $ano, ':km' => $km, ':valor' => $valor));
        return $id;
    }
    
    function getAllCars(){
    	$pdo = conectaPDO();
    	
    	$statement=$pdo->prepare("SELECT * FROM Carros");
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);
	$json=json_encode($results);
	return $json;
    }

    function createUser($firstname, $secondname, $email, $password, $pdo){
        $id = getMaxIdUser($pdo);
        $consulta = $pdo->prepare("INSERT INTO Usuario(ID, FIRSTNAME, SECONDNAME, EMAIL, PASSWORD) VALUES (:id, :firstname, :secondname, :email, :password)");
        $consulta->execute(array(':id' => $id, ':firstname' => $firstname, ':secondname' => $secondname, ':email' => $email, ':password' => $password));
        return "ok";
    }
    function getUserByEmail($email, $pdo){
    	$consulta = $pdo->prepare("select *  from Usuario where email = :email");
    	$consulta = $pdo->execute(array(':email' => $email));
    	$linha = $consulta->fetch(PDO::FETCH_ASSOC);
	$user = (object) array('email' => $linha['email'], 'firstname' => $linha['firstname'], 'secondname' => $linha['secondname'], 'password' => $linha['password']);
	return $user;
    }
    
    function deleteCAr($id){
    	$pdo = conectaPDO();
    	$consulta = $pdo->prepare("delete from Carros where id = :id");
    	$consulta->execute(array(':id' => $id));
    	return "ok";
    }

    function editarCarro($carro){
    	$pdo = conectaPDO();
        $consulta = $pdo->prepare("update Carros set ID = :id, CARRO = :carro, ANO = :ano, KM = :km, VALOR = :valor where ID = :id");
        $consulta->execute(array(':id' => $carro->$id, ':carro' => $carro->$carro, ':ano' => $carro->$ano, ':km' => $carro->$km, ':valor' => $carro->$valor));
        return true;
    }
    
    function updateUser($user){
    	$pdo = conectaPDO();
    	$consulta = $pdo->prepare("update usuario set FIRSTNAME = :firstname, SECONDNAME = :secondname, Password = :password");
    	$consulta->execute(array(':firstname' => $user->$firstname, ':secondname' => $user->$secondname, ':password' => $user->$password));
    	return true;
    }

?>