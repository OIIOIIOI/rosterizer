<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title>Rosterizer</title>
	
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
</head>
<body>
	<h1 class="mb-5">Rosterizer</h1>
	
	<div class="container-fluid">
		<div class="row">
			<div class="col">
				<canvas id="preview" width="420" height="594"></canvas>
			</div>
			<div class="col">
				<!-- IMAGES ============================================ -->
				<div class="row form-group">
					<div class="col">
						<label for="skaters">Images:</label>
					</div>
					<div class="col">
						<input id="skaters" type="number" min="0" max="30" value="14">
					</div>
				</div>
				<!-- COLUMNS ============================================ -->
				<div class="row form-group">
					<div class="col">
						<label for="columns">Columns:</label>
					</div>
					<div class="col">
						<input id="columns" type="number" min="1" max="30" value="4">
					</div>
				</div>
				<!-- RATIO ============================================ -->
				<div class="row form-group">
					<div class="col">
						<label for="image-ratio-select">Image ratio:</label>
					</div>
					<div class="col">
						<select id="image-ratio-select" class="mb-2">
							<option value="portrait">Portrait</option>
							<option value="square">Square</option>
							<option value="landscape">Landscape</option>
							<option value="custom">Custom</option>
						</select>
						<br>
						<input id="image-ratio" type="number" step="any" value="1">
					</div>
				</div>
				<!-- GUTTERS ============================================ -->
				<div class="row form-group">
					<div class="col">
						<label for="gutter">Gutter:</label>
					</div>
					<div class="col">
						<input id="gutter" type="number" min="0" value="15">
					</div>
				</div>
				<!-- SPREAD ============================================ -->
				<div class="row form-group">
					<div class="col">
						<label for="spread">Spread to cover available space:</label>
					</div>
					<div class="col">
						<input id="spread" type="checkbox" checked>
					</div>
				</div>
				<!-- ALIGN ============================================ -->
				<div id="align-group" class="row form-group">
					<div class="col">
						<label for="align-select">Alignment:</label>
					</div>
					<div class="col">
						<select id="align-select">
							<option value="start">Start</option>
							<option value="middle">Middle</option>
							<option value="end">End</option>
						</select>
					</div>
				</div>
				<!-- MARGINS ============================================ -->
				<div class="row form-group">
					<div class="col">
						<label>Margins:</label>
					</div>
					<div class="col">
						<!-- TOP -->
						<div class="row">
							<div class="col">
								<label for="margin-top">Top:</label>
							</div>
							<div class="col">
								<input id="margin-top" type="number" min="0" value="30">
							</div>
						</div>
						<!-- RIGHT -->
						<div class="row">
							<div class="col">
								<label for="margin-right">Right:</label>
							</div>
							<div class="col">
								<input id="margin-right" type="number" min="0" value="30">
							</div>
						</div>
						<!-- BOTTOM -->
						<div class="row">
							<div class="col">
								<label for="margin-bottom">Bottom:</label>
							</div>
							<div class="col">
								<input id="margin-bottom" type="number" min="0" value="30">
							</div>
						</div>
						<!-- LEFT -->
						<div class="row">
							<div class="col">
								<label for="margin-left">Left:</label>
							</div>
							<div class="col">
								<input id="margin-left" type="number" min="0" value="30">
							</div>
						</div>
					</div>
				</div>
				<!-- RENDER ============================================ -->
				<div class="row form-group">
					<div class="col">
						<input id="render" type="button" value="Render">
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="js/jquery-3.4.1.min.js"></script>
	<script src="js/fabric.min.js"></script>
	<script src="js/main.js"></script>
</body>
</html>