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
    
    override func viewDidLoad()
    {
        super.viewDidLoad();
        self.view.backgroundColor = Theme.involvistPurple;
    }
    
    override func viewDidLayoutSubviews()
    {
        super.viewDidLayoutSubviews();
        
        // this is needed b/c without it we get a top content inset created 
        // for the container scroll view.
        // http://stackoverflow.com/questions/20101572/ios7-uirefreshcontrol-changes-contentinset
        self.containerScrollView.contentInset = UIEdgeInsets.zero
    }
}
