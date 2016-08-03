<div class="tokenmessage-wrapper">
    <?php if (isset($error)): ?>
        <span class='error'>$error</span><br/>
    <?php endif; ?>
    <script type='text/javascript'>var focus_element = '#captchafield';</script>
    <div class='jumbotron'>
        <div id="tokenmessage" class="container clearfix">
            <h3>
                <?php eT("Please confirm access to survey by answering the security question below."); ?><br/>
            </h3>
        </div>
    </div>
        <?php if (isset($errorMessage)): ?>
    <div class="alert alert-danger" role="alert">
        <?php echo $errorMessage; ?> 
    </div>
    <?php endif; ?>
    <div class="row">
        <?php echo CHtml::beginForm(array("/survey/index/sid/.$iSurveyId."), 'post', array(
            'id' => 'tokenform',
            'class' => 'captcha col-sm-12 col-md-8 col-md-offset-2'
        )); ?>
    
        <div class="row form-group">        
            <label class="col-sm-6 control-label">
                <div for='loadsecurity' class='col-sm-12'><?php eT("Please enter this letters into the field"); ?></div>
                    <?php $this->widget('CCaptcha',array(
                        'buttonOptions'=>array('class'=> 'btn btn-xs btn-info'),
                        'buttonType' => 'button',
                        'buttonLabel' => gt('Reload Captcha')
                    )); ?>
            </label>
            <div class="col-sm-6">
                <div>&nbsp;</div>
                <?php echo CHtml::textField('loadsecurity', '', array(
                    'id' => 'captchafield',
                    'class' => 'text input-sm form-control '.$sKpClass,
                    'required' => 'required'
                )) ?>
            </div>     
        </div>
        
        <!-- Submit area -->
        <div class="row form-group">
            <span class='col-md-4 col-md-offset-8'>
                <?php echo CHtml::submitButton(gT("Continue"), array('class' => 'btn btn-default btn-block button submit')); ?>
            </span>
        </div>
        <?php echo CHtml::endForm(); ?>
    </div>
</div>