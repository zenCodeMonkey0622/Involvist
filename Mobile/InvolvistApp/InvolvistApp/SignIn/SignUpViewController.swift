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
    @IBOutlet weak var dismissImage: UIImageView!
    
    @IBOutlet weak var emailInput: UnderlinedTextField!
    @IBOutlet weak var emailLabel: UILabel!
    @IBOutlet weak var passwordInput: UnderlinedTextField!
    @IBOutlet weak var passwordLabel: UILabel!
    @IBOutlet weak var verifyPasswordInput: UnderlinedTextField!
    @IBOutlet weak var verifyPasswordLabel: UILabel!
    @IBOutlet weak var signUpButton: WireframeButton!
    @IBOutlet weak var joinMessageLabel: UILabel!
    @IBOutlet weak var signUpDisclaimerLabel: UILabel!
    @IBOutlet weak var termsOfServiceButton: UIButton!
    @IBOutlet weak var privacyPolicyButton: UIButton!
    
    // properties
    var authProvider: AuthServiceDelegate?
    var userService: UserServiceDelegate?
    var navDelegate: LocalNavigationDelegate?
    
    weak var signUpDelegate: SignUpProgressDelegate?
    
    // MARK: Factory
    
    static func create() -> SignUpViewController
    {
        let sb = UIStoryboard(name: "SignIn", bundle: nil)
        let vc = sb.instantiateViewController(withIdentifier: "SignUpViewController") as! SignUpViewController
        return vc
    }
    
    // MARK: Lifecycle
    override func viewDidLoad()
    {
        super.viewDidLoad()
        setContentAndStyle()
    }
    
    override func viewDidLayoutSubviews()
    {
        super.viewDidLayoutSubviews()
        
        // this is needed b/c without it we get a top content inset created
        // for the container scroll view.
        // http://stackoverflow.com/questions/20101572/ios7-uirefreshcontrol-changes-contentinset
        self.containerScrollView.contentInset = UIEdgeInsets.zero
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
        if let del = signUpDelegate
        {
            del.didCancelSignUp()
        }
        else
        {
            self.dismiss(animated: true, completion: nil)
        }
    }
    
    @IBAction func onTermsOfServiceTapped(_ sender: Any) {
    }
    
    @IBAction func onPrivacyPolicyTapped(_ sender: Any) {
    }
    
    func onSignUpSuccess(successResponse: ClientServiceResponse?)
    {
        activityIndicator.stopAnimating()
        
        guard let response = successResponse, let userData = response.data, let newUser = User(json: userData) else
        {
            showError(message: "something went wrong with the response data")
            return
        }
        
        signUpDelegate?.didRegisterUser(newUser: newUser)
    }
    
    func onSignUpFail(failResponse: ClientServiceResponse?)
    {
        activityIndicator.stopAnimating()
        showError(message: ClientServiceResponse.localizedResponse(fromMessage: failResponse?.responseMessage))
    }
    
    fileprivate func setContentAndStyle()
    {
        self.view.backgroundColor = Theme.primary
        self.dismissImage.tintColor = Theme.primaryLight
        
        self.joinMessageLabel.text = NSLocalizedString("JoinMessage", comment: "")
        
        self.fullNameInput.inputTextField.backgroundColor = UIColor.clear
        self.fullNameInput.underlineColor = UIColor.white
        self.fullNameInput.returnKeyType = UIReturnKeyType.done
        self.fullNameInput.delegate = self
        self.fullNameLabel.textColor = UIColor.white
        self.fullNameLabel.text = NSLocalizedString("FullNameLabel", comment: "")
        
        self.emailInput.inputTextField.backgroundColor = UIColor.clear
        self.emailInput.underlineColor = UIColor.white
        self.emailInput.returnKeyType = UIReturnKeyType.done
        self.emailInput.delegate = self
        self.emailLabel.textColor = UIColor.white
        self.emailLabel.text = NSLocalizedString("EmailLabel", comment: "")
        
        self.passwordInput.inputTextField.isSecureTextEntry = true
        self.passwordInput.inputTextField.backgroundColor = UIColor.clear
        self.passwordInput.underlineColor = UIColor.white
        self.passwordInput.returnKeyType = UIReturnKeyType.done
        self.passwordInput.delegate = self
        self.passwordLabel.textColor = UIColor.white
        self.passwordLabel.text = NSLocalizedString("ChoosePassword", comment: "")
        
        self.verifyPasswordInput.inputTextField.isSecureTextEntry = true
        self.verifyPasswordInput.inputTextField.backgroundColor = UIColor.clear
        self.verifyPasswordInput.underlineColor = UIColor.white
        self.verifyPasswordInput.returnKeyType = UIReturnKeyType.done
        self.verifyPasswordInput.delegate = self
        self.verifyPasswordLabel.textColor = UIColor.white
        self.verifyPasswordLabel.text = NSLocalizedString("VerifyPasswordLabel", comment: "")
        
        self.signUpDisclaimerLabel.text = NSLocalizedString("SignUpDisclaimer", comment: "");
        self.termsOfServiceButton.setTitle(NSLocalizedString("TermsOfServiceButtonLabel", comment: ""), for: UIControlState.normal)
        self.termsOfServiceButton.tintColor = Theme.primaryDark
        self.privacyPolicyButton.setTitle(NSLocalizedString("PrivacyPolicyButtonLabel", comment: ""), for: UIControlState.normal)
        self.privacyPolicyButton.tintColor = Theme.primaryDark

        self.signUpButton.wireBorderColor = UIColor.white
        self.signUpButton.isDisabled = true
        
        self.navigationController?.setNavigationBarHidden(true, animated: false)
        self.activityIndicator.isHidden = true
    }
    
    fileprivate func showError(message: String?)
    {
        if let msg = message
        {
            self.containerScrollView.isUserInteractionEnabled = false
            Popover.show(message: msg, onViewController: self, onDismiss: {() -> () in
                self.containerScrollView.isUserInteractionEnabled = true;
            })
        }
    }
}
