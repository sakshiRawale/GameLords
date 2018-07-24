/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 /**
  * Copyright (c) 2015-present, Facebook, Inc.
  *
  * This source code is licensed under the MIT license found in the
  * LICENSE file in the root directory of this source tree.
  */

 #import "AppDelegate.h"
 #import "Orientation.h"
 #import <React/RCTBundleURLProvider.h>
 #import <React/RCTRootView.h>

 @implementation AppDelegate

 - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions  :(NSDictionary *)launchOptions
 {
   NSURL *jsCodeLocation;

   jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

   RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                       moduleName:@"GameLords"
                                                initialProperties:nil
                                                    launchOptions:launchOptions];
   rootView.backgroundColor = [[UIColor alloc] initWithRed:0.0f green:0.0f blue:0.0f alpha:0];
   UIImageView *imageView = [[UIImageView alloc] initWithFrame:[UIScreen mainScreen].bounds];

   if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)
   {
     [imageView setImage:[UIImage imageNamed:@"ipad_splash"]];
   }
   else
   {
     [imageView setImage:[UIImage imageNamed:@"splash"]];

   }
   [imageView setContentMode:UIViewContentModeScaleAspectFill];


   self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
   [self.window addSubview:imageView];
   UIViewController *rootViewController = [UIViewController new];
   rootViewController.view.backgroundColor = [UIColor clearColor];
   rootViewController.view = rootView;
   self.window.rootViewController = rootViewController;
   [self.window makeKeyAndVisible];

   return YES;
 }

 - (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
   return [Orientation getOrientation];
 }

 @end
