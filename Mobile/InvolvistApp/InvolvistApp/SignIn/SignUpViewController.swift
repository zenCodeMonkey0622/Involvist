//
//  SignUpViewController.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/22/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

class SignUpViewController: UIViewController, UITextFieldDelegate
{
    @IBOutlet weak var containerScrollView: UIScrollView!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    @IBOutlet weak var fullNameInput: UnderlinedTextField!
    @IBOutlet weak var fullNameLabel: UILabel!
    @IBOutlet weak var emailInput: UnderlinedTextField!
    @IBOutlet weak var emailLabel: UILabel!
    @IBOutlet weak var passwordInput: UnderlinedTextField!
    @IBOutlet weak var passwordLabel: UILabel!
    @IBOutlet weak var verifyPasswordInput: UnderlinedTextField!
    @IBOutlet weak var verifyPasswordLabel: UILabel!
    @IBOutlet weak var signUpButton: WireframeButton!
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var fadeView: UIView!
    
    // properties
    var authProvider: AuthServiceDelegate?
    var userService: UserServiceDelegate?
    var navDelegate: LocalNavigationDelegate?
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        
        self.view.backgroundColor = Theme.involvistPrimary
        
        self.fullNameInput.inputTextField.backgroundColor = UIColor.clear
        self.fullNameInput.underlineColor = Theme.involvistDark
        self.fullNameInput.returnKeyType = UIReturnKeyType.done
        self.fullNameInput.delegate = self
        self.fullNameLabel.textColor = Theme.involvistLight
        self.fullNameLabel.text = NSLocalizedString("FullNameLabel", comment: "")
        
        self.emailInput.inputTextField.backgroundColor = UIColor.clear
        self.emailInput.underlineColor = Theme.involvistDark
        self.emailInput.returnKeyType = UIReturnKeyType.done
        self.emailInput.delegate = self
        self.emailLabel.textColor = Theme.involvistLight
        self.emailLabel.text = NSLocalizedString("EmailLabel", comment: "")
        
        self.passwordInput.inputTextField.isSecureTextEntry = true
        self.passwordInput.inputTextField.backgroundColor = UIColor.clear
        self.passwordInput.underlineColor = Theme.involvistDark
        self.passwordInput.returnKeyType = UIReturnKeyType.done
        self.passwordInput.delegate = self
        self.passwordLabel.textColor = Theme.involvistLight
        self.passwordLabel.text = NSLocalizedString("ChoosePassword", comment: "")
        
        self.verifyPasswordInput.inputTextField.isSecureTextEntry = true
        self.verifyPasswordInput.inputTextField.backgroundColor = UIColor.clear
        self.verifyPasswordInput.underlineColor = Theme.involvistDark
        self.verifyPasswordInput.returnKeyType = UIReturnKeyType.done
        self.verifyPasswordInput.delegate = self
        self.verifyPasswordLabel.textColor = Theme.involvistLight
        self.verifyPasswordLabel.text = NSLocalizedString("VerifyPasswordLabel", comment: "")
        
        self.signUpButton.wireBorderColor = UIColor.white
        self.signUpButton.isDisabled = true
        
        self.cancelButton.titleLabel?.text = NSLocalizedString("AlreadyHaveAccount", comment: "")
        self.cancelButton.tintColor = Theme.involvistLight
        
        self.navigationController?.setNavigationBarHidden(true, animated: false)
        self.activityIndicator.isHidden = true
        
    }
    
    override func viewDidLayoutSubviews()
    {
        super.viewDidLayoutSubviews()
        
        // this is needed b/c without it we get a top content inset created
        // for the container scroll view.
        // http://stackoverflow.com/questions/20101572/ios7-uirefreshcontrol-changes-contentinset
        self.containerScrollView.contentInset = UIEdgeInsets.zero
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        // debug:
        showError(message: "shit's jacked, yo")
    }
    func textFieldDidEndEditing(_ textField: UITextField)
    {
        // todo: if this is the verify password textfield, make sure the
        // passwords match
        
        // validate all text fields 
        guard let fn = fullNameInput.text, let em = emailInput.text, let pw = passwordInput.text, let verpw = verifyPasswordInput.text else
        {
            return
        }
        
        signUpButton.isDisabled = fn.isEmpty || em.isEmpty || pw.isEmpty || verpw.isEmpty
    }
    
    @IBAction func onSignUpButtonTapped(_ sender: Any)
    {
        // validate all text fields
        guard let fn = fullNameInput.text, let em = emailInput.text, let pw = passwordInput.text, let _ = verifyPasswordInput.text else
        {
            return
        }
        
        activityIndicator.startAnimating()
        
        let newUser = User(fullName: fn, loginName: em, clearTextPassword: pw)
        userService?.register(user: newUser, success: onSignUpSuccess, fail: onSignUpFail)
    }
    
    @IBAction func onCancelButtonTapped(_ sender: Any)
    {
        self.dismiss(animated: true, completion: nil)
    }
    
    func onSignUpSuccess(successResponse: ClientServiceResponse?)
    {
        activityIndicator.stopAnimating()
    }
    
    func onSignUpFail(failResponse: ClientServiceResponse?)
    {
        activityIndicator.stopAnimating()
        showError(message: failResponse?.responseMessage)
    }
    
    fileprivate func showError(message: String?)
    {
        if let msg = message
        {
            self.fadeView.alpha = Theme.popoverAlpha

            let popover = PopoverView(description: msg, onDismiss: {() -> () in
                self.fadeView.alpha = 0.0
            })
            
            Popover.show(popOver: popover, onViewController: self)
        }
    }
}
