<?php
namespace App\Tests;

require __DIR__.'/vendor/autoload.php'; // Composer's autoloader

use Symfony\Component\Panther\PantherTestCase;

class E2eTest extends PantherTestCase
{
    
    public function test27sepfilm1normaal0600()
    {
        $client = \Symfony\Component\Panther\Client::createChromeClient();
        $crawler = $client->request('GET', 'http://dehallen.local/agenda/?offset=10&date=27%2F09%2F2018&time=&planbutton=Plan');

        $client->waitFor('.hourblock');
        
        $html = $client->getPageSource();
        
        $this->assertContains('06:00', $html );
        $this->assertContains('Film1', $html );
        $this->assertContains('tease-549', $html );
        
    }
    
    public function test27sepfilm2normaal0600()
    {
        $client = \Symfony\Component\Panther\Client::createChromeClient();
        $crawler = $client->request('GET', 'http://dehallen.local/agenda/?offset=10&date=27%2F09%2F2018&time=&planbutton=Plan');
        
        // $link = $crawler->selectLink('Support')->link();
        // $crawler = $client->click($link);
        
        // Wait for an element to be rendered
        $client->waitFor('.hourblock');
        
        $html = $client->getPageSource();
        
        $this->assertContains('06:00', $html );
        $this->assertContains('Film2', $html );
        $this->assertContains('tease-550', $html );
    }
    
    public function test27sepexpositiesybrandy0700()
    {
        $client = \Symfony\Component\Panther\Client::createChromeClient();
        $crawler = $client->request('GET', 'http://dehallen.local/agenda/?offset=8&date=27%2F09%2F2018&time=07%3A00&planbutton=Plan');

        $html = $client->getPageSource();
        
        $this->assertContains('07:00', $html );
        $this->assertContains('Sybrandy', $html );
        $this->assertContains('tease-1005', $html );
    }
    
    public function test5octfotoclub0700()
    {
        $client = \Symfony\Component\Panther\Client::createChromeClient();
        $crawler = $client->request('GET', 'http://dehallen.local/agenda/?offset=8&date=01%2F08%2F2018&time=&planbutton=Plan');
        
        $html = $client->getPageSource();
        
        $this->assertContains('07:00', $html );
        $this->assertContains('foto-expositie-fvgvb-fotoclub-gvb', $html );
        $this->assertContains('tease-1007', $html );
    }
    
}
