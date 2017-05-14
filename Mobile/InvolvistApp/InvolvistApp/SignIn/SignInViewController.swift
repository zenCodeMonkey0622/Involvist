//
//  SignInViewController.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/5/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

class SignInViewController: UIViewController
{
    @IBOutlet weak var containerScrollView: UIScrollView!
    @IBOutlet weak var userNameInput: UnderlinedTextField!
    @IBOutlet weak var passwordInput: UnderlinedTextField!
    @IBOutlet weak var logInButton: WireframeButton!
    @IBOutlet weak var signUpButton: WireframeButton!
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        self.view.backgroundColor = Theme.involvistPrimary
        
        self.userNameInput.inputTextField.backgroundColor = UIColor.clear
        self.userNameInput.underlineColor = UIColor.white
        self.userNameInput.returnKeyType = UIReturnKeyType.done
        
        self.passwordInput.inputTextField.isSecureTextEntry = true
        self.passwordInput.inputTextField.backgroundColor = UIColor.clear
        self.passwordInput.underlineColor = UIColor.white
        self.userNameInput.returnKeyType = UIReturnKeyType.done
        
        self.logInButton.wireBorderColor = Theme.involvistDark
        self.signUpButton.wireBorderColor = Theme.involvistDark
        
        self.navigationController?.setNavigationBarHidden(true, animated: false)
    }
    
    override func viewDidLayoutSubviews()
    {
        super.viewDidLayoutSubviews()
        
        // this is needed b/c without it we get a top content inset created 
        // for the container scroll view.
        // http://stackoverflow.com/questions/20101572/ios7-uirefreshcontrol-changes-contentinset
        self.containerScrollView.contentInset = UIEdgeInsets.zero
    }
}
