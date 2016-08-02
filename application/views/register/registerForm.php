<?php echo CHtml::form($urlAction,'post',array('id'=>'limesurvey', 'role' => 'form', 'class' => 'form-horizontal')); ?>
    <input type="hidden" name="lang" value="<?php echo $sLanguage; ?>" id="register_lang" />
    <div class='form-group col-xs-12'>
        <label for='register_firstname' class='control-label col-sm-2'><?php eT("First name"); ?></label>
        <div class="col-sm-10">
            <?php echo CHtml::textField('register_firstname', $sFirstName,array('id'=>'register_firstname','class'=>'form-control input-sm')); ?>
        </div>
    </div>
    <div class='form-group col-xs-12'>
        <label for='register_lastname' class='control-label col-sm-2'><?php eT("Last name"); ?></label>
        <div class="col-sm-10">
        <?php echo CHtml::textField('register_lastname', $sLastName,array('id'=>'register_lastname','class'=>'form-control input-sm')); ?>
        </div>
    </div>
    <div class='form-group col-xs-12'>
        <label for='register_email' class='control-label col-sm-2'><?php eT("Email address"); ?></label>
        <div class="col-sm-10">
        <?php echo CHtml::textField('register_email', $sEmail,array('id'=>'register_email','class'=>'form-control input-sm','required'=>'required')); ?>
        </div>
    </div>
    <?php foreach($aExtraAttributes as $key=>$aExtraAttribute){ ?>
        <div class='form-group col-xs-12'>
            <label for="register_<?php echo $key; ?>" class='control-label col-sm-2'><?php echo $aExtraAttribute['caption']; ?><?php echo $aExtraAttribute['mandatory'] == 'Y' ? '*' : ""; ?></label>
            <div class="col-sm-10">
            <?php echo CHtml::textField("register_{$key}", $aAttribute[$key],array('id'=>"register_{$key}",'class'=>'form-control input-sm')); ?>
            </div>
        </div>
    <?php } ?>
    <?php if($bCaptcha){ ?>
    <div class='form-group col-xs-12'>
        <label for='loadsecurity' class='control-label col-sm-2'><?php eT("Security Question"); ?></label>
        <div class="col-sm-4">
        <?php $this->widget('CCaptcha',
                array(
                    'buttonOptions'=>array('class'=> 'btn btn-xs btn-info'),
                    'buttonType' => 'button',
                    'buttonLabel' => gt('Reload Captcha')
                )); ?>
        </div>
        <div class="col-sm-6">
            <?php echo CHtml::textField('loadsecurity', '',array('id'=>'loadsecurity','class'=>'form-control input-sm','required'=>'required')); ?>
        </div>
    </div>
    <?php } ?>
    <div class='form-group col-xs-12'>
        <div class="col-xs-12 col-sm-4 col-sm-offset-8">
        <?php echo CHtml::submitButton(gT("Continue",'unescaped'),array('class'=>'btn-default btn-block btn','id'=>'register','name'=>'register')); ?>
    </div>
<?php echo CHtml::endForm(); ?>
