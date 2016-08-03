<?php echo CHtml::form($urlAction,'post',array('id'=>'limesurvey', 'role' => 'form', 'class' => 'form-horizontal col-sm-12 col-md-8 col-md-offset-2')); ?>
    <input type="hidden" name="lang" value="<?php echo $sLanguage; ?>" id="register_lang" />
    <div class='form-group col-sm-12'>
        <label for='register_firstname' class='control-label col-md-2'><?php eT("First name"); ?></label>
        <div class="col-md-10">
            <?php echo CHtml::textField('register_firstname', $sFirstName,array('id'=>'register_firstname','class'=>'form-control input-sm')); ?>
        </div>
    </div>
    <div class='form-group col-sm-12'>
        <label for='register_lastname' class='control-label col-md-2'><?php eT("Last name"); ?></label>
        <div class="col-md-10">
        <?php echo CHtml::textField('register_lastname', $sLastName,array('id'=>'register_lastname','class'=>'form-control input-sm')); ?>
        </div>
    </div>
    <div class='form-group col-sm-12'>
        <label for='register_email' class='control-label col-md-2'><?php eT("Email address"); ?></label>
        <div class="col-md-10">
        <?php echo CHtml::textField('register_email', $sEmail,array('id'=>'register_email','class'=>'form-control input-sm','required'=>'required')); ?>
        </div>
    </div>
    <?php foreach($aExtraAttributes as $key=>$aExtraAttribute){ ?>
        <div class='form-group col-sm-12'>
            <label for="register_<?php echo $key; ?>" class='control-label col-md-2'><?php echo $aExtraAttribute['caption']; ?><?php echo $aExtraAttribute['mandatory'] == 'Y' ? '*' : ""; ?></label>
            <div class="col-md-10">
            <?php echo CHtml::textField("register_{$key}", $aAttribute[$key],array('id'=>"register_{$key}",'class'=>'form-control input-sm')); ?>
            </div>
        </div>
    <?php } ?>
    <?php if($bCaptcha){ ?>
        <div class='form-group col-sm-12'>
            <label class="control-label  col-md-6">
                <div for='loadsecurity' class='col-sm-12'><?php eT("Please enter this letters into the field"); ?></div>
                <div class="col-sm-12">
                    <?php $this->widget('CCaptcha',
                        array(
                            'buttonOptions'=>array('class'=> 'btn btn-xs btn-info'),
                            'buttonType' => 'button',
                            'buttonLabel' => gt('Reload Captcha')
                        )); ?>
                </div>
            </label>
            <div class="col-md-6">
                <div>&nbsp;</div>
                <?php echo CHtml::textField('loadsecurity', '',array('id'=>'loadsecurity','class'=>'form-control input-sm','required'=>'required')); ?>
            </div>
        </div>
    <?php } ?>
    <div class='form-group col-sm-12'>
        <div class="col-sm-12 col-md-4 col-md-offset-8">
        <?php echo CHtml::submitButton(gT("Continue",'unescaped'),array('class'=>'btn-default btn-block btn','id'=>'register','name'=>'register')); ?>
    </div>
<?php echo CHtml::endForm(); ?>
