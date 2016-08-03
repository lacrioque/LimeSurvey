<div class="tokenmessage-wrapper">
    <?php if (isset($secerror)): ?>
        <span class='error'>$secerror</span><br/>
    <?php endif; ?>
    <script type='text/javascript'>var focus_element = '#token';</script>
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2">
            <p id="tokenmessage">
                <?php eT("This is a controlled survey. You need a valid token to participate."); ?><br/>
                <?php if(!isset($token)): ?>
                <?php eT("If you have been issued a token, please enter it in the box below and click continue."); ?>
                <?php else: ?>
                <?php eT("Please confirm the token by answering the security question below and click continue."); ?>
                <?php endif; ?>
            </p>
        </div>
    </div>

    <div class="row">
        <?php echo CHtml::beginForm(array("/survey/index/sid/.$iSurveyId."), 'post', array(
            'id' => 'tokenform',
            'class' => 'col-xs-12 col-sm-8 col-sm-offset-2'
        )); ?>
        <div class="row form-group">
            <div class="col-xs-12 col-sm-4">
                <?php echo CHtml::label(gT("Token"), 'token', array(
                    'class' => 'control-label '.$sKpClass,
                    ));
                ?>
            </div>
            <div class="col-xs-12 col-sm-8">

                <?php if(!isset($token)): ?>
                <?php echo CHtml::passwordField('token', '', array(
                    'class' => 'text input-sm form-control '.$sKpClass,
                    'required' => 'required',
                    'id' => 'token'));
                ?>
                <?php else: ?>
                <?php echo CHtml::passwordField('visibleToken', $visibleToken, array(
                    'id' => 'visibleToken',
                    'class' => 'text input-sm form-control '.$sKpClass,
                    'disabled'=>'disabled',
                    'data-value' => $visibleToken,
                    'value' => $visibleToken,
                    ));
                ?>
                <?php echo CHtml::hiddenField('token', $token, array(
                    'class'=>$sKpClass,
                    'id' => 'token',
                    'data-value' => $token,
                    'value' => $token));
                ?>
                <?php endif; ?>

                <?php echo CHtml::hiddenField('sid', $iSurveyId, array('id' => 'sid')); ?>
                <?php echo CHtml::hiddenField('lang', $sLangCode, array('id' => 'lang')); ?>

                <?php if ($bNewTest): ?>
                    <?php echo CHtml::hiddenField('lang', $sLangCode, array('id' => 'lang')); ?>
                <?php endif; ?>
            </div>
        </div>
        <?php
        if ($bDirectReload) : ?>
            <?php echo CHtml::hiddenField('loadall', $iSurveyId, array('id' => 'loadall')); ?>
            <?php echo CHtml::hiddenField('scid', $sCid, array('id' => 'scid')); ?>
            <?php echo CHtml::hiddenField('loadname', $Loadname, array('id' => 'loadname')); ?>
            <?php echo CHtml::hiddenField('loadpass', $sLoadpass, array('id' => 'loadpass')); ?>
        <?php endif; ?>


        <?php if (isset($bCaptchaEnabled)): ?>
        <div class="row form-group">
            <div class="col-xs-12 col-sm-4">
                <?php echo CHtml::label(gT("Security question"), 'captchafield', array(
                    'class' => ' control-label captchaimage '.$sKpClass
                    ));
                ?>
            </div>
            
            <div class="col-xs-12 col-sm-8">
                <div class="row form-group">
                    <div class="col-xs-4">
                            <?php $this->widget('CCaptcha',array(
                                'buttonOptions'=>array('class'=> 'btn btn-xs btn-info'),
                                'buttonType' => 'button',
                                'buttonLabel' => gt('Reload image'),
                            )); ?>
                    </div>
                    <div class="col-xs-8">
                        <?php echo CHtml::textField('loadsecurity', '', array(
                            'id' => 'captchafield',
                            'class' => 'text input-sm form-control '.$sKpClass,
                            'required' => 'required'
                        )) ?>
                    </div>
                </div>
            </div>
            <?php endif; ?>
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