//
//  ViewController.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/2/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import UIKit

class RootNavigationController: UINavigationController
{
    lazy var signInStoryboard: UIStoryboard = {
        let sb = UIStoryboard(name: "SignIn", bundle: nil)
        return sb
    }()
    
    lazy var authService: AuthServiceDelegate = {
        let a = AuthenticationService()
        return a
    }()
    
    lazy var userService: UserServiceDelegate = {
        let u = UserService()
        return u
    }()
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // set the theme
        Theme.setTheme(theme: .Bolombo)
        Text.setCapStyle(capStyle: .AllLowercased)
        
        // load sign-in view controller
        if let signInVc = signInStoryboard.instantiateViewController(withIdentifier: "SignInViewController") as? SignInViewController
        {
            signInVc.authProvider = authService
            signInVc.navDelegate = self
            self.pushViewController(signInVc, animated: true)
        }
    }

    override func didReceiveMemoryWarning()
    {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}

