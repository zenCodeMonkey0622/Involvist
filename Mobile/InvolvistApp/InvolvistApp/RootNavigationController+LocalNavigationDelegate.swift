//
//  RootNavigationController+LocalNavigatorDelegate.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/22/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation

extension RootNavigationController: LocalNavigationDelegate
{
    func navigateTo(_: DestinationView)
    {
        // load sign-in view controller
        if let signUpVc = signInStoryboard.instantiateViewController(withIdentifier: "SignUpViewController") as? SignUpViewController
        {
            self.pushViewController(signUpVc, animated: true)
        }
    }
}
