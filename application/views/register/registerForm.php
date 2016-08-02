<?php echo CHtml::form($urlAction,'post',array('id'=>'limesurvey', 'role' => 'form')); ?>
    <input type="hidden" name="lang" value="<?php echo $sLanguage; ?>" id="register_lang" />
    <div class='form-group col-xs-12'>
        <label for='register_firstname'><?php eT("First name"); ?></label>
        <?php echo CHtml::textField('register_firstname', $sFirstName,array('id'=>'register_firstname','class'=>'form-control input-sm')); ?>
    </div>
    <div class='form-group col-xs-12'>
        <label for='register_lastname'><?php eT("Last name"); ?></label>
        <?php echo CHtml::textField('register_lastname', $sLastName,array('id'=>'register_lastname','class'=>'form-control input-sm')); ?>
    </div>
    <div class='form-group col-xs-12'>
        <label for='register_email'><?php eT("Email address"); ?></label>
        <?php echo CHtml::textField('register_email', $sEmail,array('id'=>'register_email','class'=>'form-control input-sm','required'=>'required')); ?>
    </div>
    <?php foreach($aExtraAttributes as $key=>$aExtraAttribute){ ?>
        <div class='form-group col-xs-12'>
            <label for="register_<?php echo $key; ?>"><?php echo $aExtraAttribute['caption']; ?><?php echo $aExtraAttribute['mandatory'] == 'Y' ? '*' : ""; ?></label>
            <?php echo CHtml::textField("register_{$key}", $aAttribute[$key],array('id'=>"register_{$key}",'class'=>'form-control input-sm')); ?>
        </div>
    <?php } ?>
    <?php if($bCaptcha){ ?>
    <div class='form-group col-xs-12'>
        <label for='loadsecurity'><?php eT("Security Question"); ?></label>
        <?php $this->widget('CCaptcha',
                array(
                    'buttonOptions'=>array('class'=> 'btn btn-xs btn-info'),
                    'buttonType' => 'button',
                    'buttonLabel' => gt('Reload Captcha')
                )); ?>
        <?php echo CHtml::textField('loadsecurity', '',array('id'=>'loadsecurity','class'=>'form-control input-sm','required'=>'required')); ?>
    </div>
    <?php } ?>
    <div class='form-group col-xs-12'>
        <div class="col-xs-12 col-sm-4 col-sm-offset-8">
        <?php echo CHtml::submitButton(gT("Continue",'unescaped'),array('class'=>'btn-default btn-block btn','id'=>'register','name'=>'register')); ?>
    </div>
<?php echo CHtml::endForm(); ?>
