//
//  SignUpViewController.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/22/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

class SignUpViewController: UIViewController
{
    @IBOutlet weak var containerScrollView: UIScrollView!
    @IBOutlet weak var activityIndidcator: UIActivityIndicatorView!
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        self.view.backgroundColor = Theme.involvistPrimary
        
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
