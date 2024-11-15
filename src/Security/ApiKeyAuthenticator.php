<?php
// src/Security/ApiKeyAuthenticator.php
namespace App\Security;

use App\Entity\OldEntity\User;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\CustomCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;

class ApiKeyAuthenticator extends AbstractAuthenticator
{
    private EntityManagerInterface $em;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(EntityManagerInterface $em,UserPasswordHasherInterface $passwordHasher)
    {
        $this->em = $em;
        $this->passwordHasher = $passwordHasher;
    }
    /**
     * Called on every request to decide if this authenticator should be
     * used for the request. Returning `false` will cause this authenticator
     * to be skipped.
     */
    public function supports(Request $request): ?bool
    {
        return $request->isMethod('POST') && '/api/login_check' === $request->getPathInfo();
    }

    public function authenticate(Request $request): Passport
    {
        $email = $request->request->get('email', '');
        $password = $request->request->get('password', '');
        $request->getSession()->set(Security::LAST_USERNAME, $email);

        return new Passport(
            new UserBadge($email."-|-".$password, function($userIdentifier) {
                $credentials = explode('-|-',$userIdentifier);
                $user = $this->em->getRepository(Users::class)->findOneBy(['email' => $credentials[0]]);
                if(!$user) {
                    throw new CustomUserMessageAuthenticationException('บัญชีผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง');
                }
                if (!$user->isIsEnabled()) {
                    // บัญชีผู้ใช้ถูกปิดการใช้งาน
                    throw new CustomUserMessageAuthenticationException('บัญชีผู้ใช้ถูกปิดการใช้งาน');
                }
                $isPasswordValid = $this->passwordHasher->isPasswordValid($user, $credentials[1]);
                if (!$isPasswordValid) throw new CustomUserMessageAuthenticationException('บัญชีผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง');
                /*$hashedPassword = $this->passwordHasher->hashPassword(
                    $user,
                    $credentials[1]
                );
                $user->setPassword($hashedPassword);
                $this->em->persist($user);
                $this->em->flush();*/
                return $user;

            }),
            new CustomCredentials(
                function ($credentials, UserInterface $user) {
                    return true;
                },
                ''
            )
        );

        /*$ldaprdn  = $email;
        $ldappass = $password;

        $ldapconn = ldap_connect('192.168.253.19','389');
        ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);
        if($ldapconn){
            $ldapbind = @ldap_bind($ldapconn, $ldaprdn, $ldappass);
            if ($ldapbind)
            {

            }
            else
            {
//                throw new CustomUserMessageAuthenticationException('Invalid ldap credentials');
                throw new CustomUserMessageAuthenticationException('ข้อมูลบัญชีผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง');
            }
        }
        throw new CustomUserMessageAuthenticationException('ข้อมูลบัญชีผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง');*/
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // on success, let the request continue
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $data = [
            // you may want to customize or obfuscate the message first
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData())

            // or to translate this message
            // $this->translator->trans($exception->getMessageKey(), $exception->getMessageData())
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }
}